import React, { useState } from 'react';
import './GameSetup.css';

const GameSetup = ({ onGameStart }) => {
  const [playerName, setPlayerName] = useState('');
  const [players, setPlayers] = useState([]);
  const [gameMode, setGameMode] = useState('local'); // local, online

  const addPlayer = () => {
    if (playerName.trim() && players.length < 10) {
      const newPlayer = {
        id: Date.now(),
        name: playerName.trim(),
        isHost: players.length === 0
      };
      setPlayers([...players, newPlayer]);
      setPlayerName('');
    }
  };

  const removePlayer = (playerId) => {
    setPlayers(players.filter(p => p.id !== playerId));
  };

  const startGame = () => {
    if (players.length >= 3) {
      onGameStart(players);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addPlayer();
    }
  };

  return (
    <div className="game-setup fade-in">
      <div className="card">
        <h2 className="card-title">🎮 게임 설정</h2>
        
        <div className="setup-section">
          <h3>게임 모드</h3>
          <div className="mode-selector">
            <button 
              className={`mode-btn ${gameMode === 'local' ? 'active' : ''}`}
              onClick={() => setGameMode('local')}
            >
              🏠 로컬 플레이
            </button>
            <button 
              className={`mode-btn ${gameMode === 'online' ? 'active' : ''}`}
              onClick={() => setGameMode('online')}
              disabled
            >
              🌐 온라인 플레이 (곧 출시)
            </button>
          </div>
        </div>

        <div className="setup-section">
          <h3>플레이어 추가 ({players.length}/10)</h3>
          <div className="player-input">
            <input
              type="text"
              className="input"
              placeholder="플레이어 이름 입력"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              onKeyPress={handleKeyPress}
              maxLength={10}
            />
            <button className="btn btn-secondary" onClick={addPlayer}>
              ➕ 추가
            </button>
          </div>
          
          <div className="players-list">
            {players.map((player, index) => (
              <div key={player.id} className="player-item slide-in">
                <span className="player-number">{index + 1}</span>
                <span className="player-name">{player.name}</span>
                {player.isHost && <span className="host-badge">방장</span>}
                <button 
                  className="remove-btn"
                  onClick={() => removePlayer(player.id)}
                >
                  ❌
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="setup-section">
          <h3>게임 규칙</h3>
          <div className="rules-summary">
            <div className="rule-item">
              <span className="rule-icon">🧑‍💼</span>
              <span>시민: 마피아를 찾아내 처형</span>
            </div>
            <div className="rule-item">
              <span className="rule-icon">🕴️</span>
              <span>마피아: 정체를 숨기고 생존</span>
            </div>
            <div className="rule-item">
              <span className="rule-icon">🕵️‍♂️</span>
              <span>스파이: 마피아 투표로 4점 획득 시 우승</span>
            </div>
            <div className="rule-item">
              <span className="rule-icon">💻</span>
              <span>특수요원: 투표 해킹 능력 보유</span>
            </div>
          </div>
        </div>

        <div className="setup-actions">
          <button 
            className="btn"
            onClick={startGame}
            disabled={players.length < 3}
          >
            🎯 게임 시작 ({players.length >= 3 ? '가능' : `플레이어 ${3 - players.length}명 필요`})
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameSetup;
