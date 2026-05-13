import React, { useState, useEffect } from 'react';
import './App.css';
import GameSetup from './components/GameSetup';
import GameLobby from './components/GameLobby';
import GameBoard from './components/GameBoard';
import ClueBriefing from './components/ClueBriefing';
import VotingPhase from './components/VotingPhase';
import GameResult from './components/GameResult';

const GAME_PHASES = {
  SETUP: 'setup',
  LOBBY: 'lobby',
  BRIEFING: 'briefing',
  DISCUSSION: 'discussion',
  VOTING: 'voting',
  RESULT: 'result'
};

const ROLES = {
  CITIZEN: '시민',
  MAFIA: '마피아',
  SPY: '스파이',
  AGENT: '특수요원'
};

function App() {
  const [gamePhase, setGamePhase] = useState(GAME_PHASES.SETUP);
  const [players, setPlayers] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [gameData, setGameData] = useState(null);
  const [round, setRound] = useState(1);

  // 게임 초기화
  const initializeGame = (playerList) => {
    setPlayers(playerList);
    assignRoles(playerList);
    setGamePhase(GAME_PHASES.LOBBY);
  };

  // 역할 배정
  const assignRoles = (playerList) => {
    const roles = [];
    const playerCount = playerList.length;

    // 역할 배정 로직
    let mafiaCount = Math.max(1, Math.floor(playerCount / 4));
    let spyCount = playerCount >= 4 ? 1 : 0;
    let agentCount = playerCount >= 6 ? 1 : 0;

    for (let i = 0; i < mafiaCount; i++) roles.push(ROLES.MAFIA);
    for (let i = 0; i < spyCount; i++) roles.push(ROLES.SPY);
    for (let i = 0; i < agentCount; i++) roles.push(ROLES.AGENT);
    while (roles.length < playerCount) roles.push(ROLES.CITIZEN);

    // 역할 섞기
    const shuffledRoles = roles.sort(() => Math.random() - 0.5);

    const updatedPlayers = playerList.map((player, index) => ({
      ...player,
      role: shuffledRoles[index],
      isAlive: true,
      votes: 0,
      spyPoints: 0
    }));

    setPlayers(updatedPlayers);
    setCurrentPlayer(updatedPlayers[0]); // 첫 번째 플레이어를 현재 플레이어로 설정
  };

  // 게임 시작
  const startGame = () => {
    generateClues();
    setGamePhase(GAME_PHASES.BRIEFING);
  };

  // 단서 생성
  const generateClues = () => {
    const locations = ['옥상', '지하실', '서재', '주차장', '창고', '회의실'];
    const objects = ['칼', '총', '밧줄', '독약', '망치', '유리조각'];
    const states = ['피 묻은', '부서진', '닫힌', '열린', '뒤틀린', '녹은'];
    const emotions = ['비명', '웃음소리', '흐느낌', '침묵', '고함', '속삭임'];
    const sounds = ['쾅', '드르륵', '찰칵', '휙', '콰당탕', '삐걱'];

    const realLocation = locations[Math.floor(Math.random() * locations.length)];
    const allClues = [
      ...objects,
      ...states,
      ...emotions,
      ...sounds
    ];

    if (round === 1) {
      // 1라운드: 각자 다른 단서 배분
      const realClues = [
        objects[Math.floor(Math.random() * objects.length)],
        states[Math.floor(Math.random() * states.length)],
        emotions[Math.floor(Math.random() * emotions.length)],
        sounds[Math.floor(Math.random() * sounds.length)]
      ];

      const fakeLocations = locations.filter(loc => loc !== realLocation);

      const updatedPlayers = players.map((player, index) => {
        if (player.role === ROLES.MAFIA) {
          // 마피아: 각자 다른 가짜 장소
          const fakeLocation = fakeLocations[index % fakeLocations.length];

          return {
            ...player,
            briefing: {
              location: fakeLocation,
              clues: [],
              roundType: 'first'
            }
          };
        } else {
          // 시민: 진짜 장소 + 각자 다른 진짜 단서 1개
          const clueIndex = index % realClues.length;

          return {
            ...player,
            briefing: {
              location: realLocation,
              clues: [realClues[clueIndex]],
              roundType: 'first'
            }
          };
        }
      });

      setPlayers(updatedPlayers);
      setGameData({
        realLocation,
        realClues,
        fakeLocations,
        roundType: 'first'
      });
    } else {
      // 2라운드 이후: 모두에게 동일한 추가 단서
      const additionalClue = allClues[Math.floor(Math.random() * allClues.length)];

      const updatedPlayers = players.map(player => ({
        ...player,
        briefing: {
          location: player.briefing?.location || realLocation,
          clues: [...(player.briefing?.clues || []), additionalClue],
          roundType: 'subsequent',
          discoveryMessage: "누군가가 사건의 실마리를 발견하였습니다."
        }
      }));

      setPlayers(updatedPlayers);
      setGameData({
        ...gameData,
        additionalClue,
        roundType: 'subsequent'
      });
    }
  };

  // 투표 처리
  const handleVote = (voterId, targetId) => {
    const updatedPlayers = players.map(player => {
      if (player.id === targetId) {
        return { ...player, votes: player.votes + 1 };
      }
      return player;
    });

    setPlayers(updatedPlayers);
  };

  // 처형 실행
  const executeElimination = () => {
    const alivePlayers = players.filter(p => p.isAlive);
    const maxVotes = Math.max(...alivePlayers.map(p => p.votes));
    const threshold = Math.floor(alivePlayers.length / 2) + 1;

    if (maxVotes >= threshold) {
      const eliminated = alivePlayers.find(p => p.votes === maxVotes);
      const updatedPlayers = players.map(player =>
        player.id === eliminated.id ? { ...player, isAlive: false } : player
      );
      setPlayers(updatedPlayers);

      // 승리 조건 체크
      checkWinCondition(updatedPlayers);
    } else {
      // 과반수 미달 - 다음 라운드
      nextRound();
    }
  };

  // 승리 조건 체크
  const checkWinCondition = (currentPlayers) => {
    const alivePlayers = currentPlayers.filter(p => p.isAlive);
    const aliveMafia = alivePlayers.filter(p => p.role === ROLES.MAFIA);
    const aliveCitizens = alivePlayers.filter(p => p.role !== ROLES.MAFIA);
    const spyWin = alivePlayers.find(p => p.spyPoints >= 4);

    if (spyWin) {
      setGamePhase(GAME_PHASES.RESULT);
      return;
    }

    if (aliveMafia.length === 0) {
      setGamePhase(GAME_PHASES.RESULT);
      return;
    }

    if (aliveMafia.length >= aliveCitizens.length) {
      setGamePhase(GAME_PHASES.RESULT);
      return;
    }

    nextRound();
  };

  // 다음 라운드
  const nextRound = () => {
    setRound(round + 1);
    setPlayers(players.map(p => ({ ...p, votes: 0 })));
    setGamePhase(GAME_PHASES.BRIEFING);
    generateClues();
  };

  // 현재 플레이어 변경
  const switchPlayer = (playerId) => {
    const player = players.find(p => p.id === playerId);
    setCurrentPlayer(player);
  };

  return (
    <div className="App">
      <header className="game-header">
        <h1>🕵️ 첩보국 마피아 스파이</h1>
        {gamePhase !== GAME_PHASES.SETUP && (
          <div className="game-info">
            <span>라운드 {round}</span>
            <span>생존: {players.filter(p => p.isAlive).length}명</span>
          </div>
        )}
      </header>

      <main className="game-main">
        {gamePhase === GAME_PHASES.SETUP && (
          <GameSetup onGameStart={initializeGame} />
        )}

        {gamePhase === GAME_PHASES.LOBBY && (
          <GameLobby
            players={players}
            onStartGame={startGame}
            onSwitchPlayer={switchPlayer}
            currentPlayer={currentPlayer}
          />
        )}

        {gamePhase === GAME_PHASES.BRIEFING && (
          <ClueBriefing
            currentPlayer={currentPlayer}
            onNextPhase={() => setGamePhase(GAME_PHASES.DISCUSSION)}
          />
        )}

        {gamePhase === GAME_PHASES.DISCUSSION && (
          <GameBoard
            players={players}
            currentPlayer={currentPlayer}
            onSwitchPlayer={switchPlayer}
            onStartVoting={() => setGamePhase(GAME_PHASES.VOTING)}
          />
        )}

        {gamePhase === GAME_PHASES.VOTING && (
          <VotingPhase
            players={players}
            currentPlayer={currentPlayer}
            onVote={handleVote}
            onExecute={executeElimination}
          />
        )}

        {gamePhase === GAME_PHASES.RESULT && (
          <GameResult
            players={players}
            onRestart={() => {
              setGamePhase(GAME_PHASES.SETUP);
              setPlayers([]);
              setCurrentPlayer(null);
              setGameData(null);
              setRound(1);
            }}
          />
        )}
      </main>
    </div>
  );
}

export default App;
