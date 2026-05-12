import React, { useState, useEffect } from 'react';
import './GameResult.css';

const GameResult = ({ players, onRestart }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [confetti, setConfetti] = useState([]);

  useEffect(() => {
    // 승리시 폭죽 효과
    const winner = determineWinner();
    if (winner.type !== 'none') {
      generateConfetti();
    }
  }, []);

  const generateConfetti = () => {
    const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe'];
    const newConfetti = [];
    
    for (let i = 0; i < 50; i++) {
      newConfetti.push({
        id: i,
        left: Math.random() * 100,
        animationDelay: Math.random() * 3,
        animationDuration: 3 + Math.random() * 2,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
    
    setConfetti(newConfetti);
  };

  const determineWinner = () => {
    const alivePlayers = players.filter(p => p.isAlive);
    const aliveMafia = alivePlayers.filter(p => p.role === '마피아');
    const aliveCitizens = alivePlayers.filter(p => p.role !== '마피아');
    const spyWinner = players.find(p => p.spyPoints >= 4);
    
    if (spyWinner) {
      return {
        type: 'spy',
        winner: spyWinner,
        message: '🕵️‍♂️ 스파이의 단독 우승!',
        description: `${spyWinner.name}가(이) 스파이 포인트 4점을 달성하여 단독 우승했습니다!`
      };
    }
    
    if (aliveMafia.length === 0) {
      return {
        type: 'citizens',
        winner: aliveCitizens,
        message: '🎉 시민 진영의 승리!',
        description: '모든 마피아를 처형하여 시민 진영이 승리했습니다!'
      };
    }
    
    if (aliveMafia.length >= aliveCitizens.length) {
      return {
        type: 'mafia',
        winner: aliveMafia,
        message: '🕴️ 마피아 진영의 승리!',
        description: '마피아가 시민 수 이상으로 생존하여 마피아 진영이 승리했습니다!'
      };
    }
    
    return {
      type: 'none',
      winner: null,
      message: '게임 종료',
      description: '게임이 종료되었습니다.'
    };
  };

  const getRoleEmoji = (role) => {
    const roleEmojis = {
      '시민': '🧑‍💼',
      '마피아': '🕴️',
      '스파이': '🕵️‍♂️',
      '특수요원': '💻'
    };
    return roleEmojis[role] || '❓';
  };

  const getRoleBadgeClass = (role) => {
    const roleMap = {
      '시민': 'citizen',
      '마피아': 'mafia',
      '스파이': 'spy',
      '특수요원': 'agent'
    };
    return roleMap[role] || 'unknown';
  };

  const winner = determineWinner();

  return (
    <div className="game-result fade-in">
      {/* 폭죽 효과 */}
      {confetti.map(particle => (
        <div
          key={particle.id}
          className="confetti"
          style={{
            left: `${particle.left}%`,
            animationDelay: `${particle.animationDelay}s`,
            animationDuration: `${particle.animationDuration}s`,
            backgroundColor: particle.color
          }}
        />
      ))}

      <div className="card result-card">
        <div className="result-header">
          <h2 className="result-title">{winner.message}</h2>
          <p className="result-description">{winner.description}</p>
        </div>

        {winner.type === 'spy' && (
          <div className="winner-spotlight">
            <div className="winner-avatar">
              {winner.winner.name.charAt(0).toUpperCase()}
            </div>
            <div className="winner-info">
              <h3>{winner.winner.name}</h3>
              <span className={`role-badge role-badge-${getRoleBadgeClass(winner.winner.role)}`}>
                {getRoleEmoji(winner.winner.role)} {winner.winner.role}
              </span>
              <div className="spy-points">
                <span className="points-value">🎯 {winner.winner.spyPoints}점</span>
              </div>
            </div>
          </div>
        )}

        {winner.type === 'citizens' && (
          <div className="team-celebration">
            <div className="team-members">
              {winner.winner.map((player, index) => (
                <div key={player.id} className="team-member">
                  <div className="member-avatar">
                    {player.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="member-name">{player.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {winner.type === 'mafia' && (
          <div className="team-celebration mafia-celebration">
            <div className="team-members">
              {winner.winner.map((player, index) => (
                <div key={player.id} className="team-member mafia-member">
                  <div className="member-avatar">
                    {player.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="member-name">{player.name}</span>
                  <span className="role-reveal">🕴️ 마피아</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="result-actions">
          <button 
            className="btn btn-secondary"
            onClick={() => setShowDetails(!showDetails)}
          >
            📊 {showDetails ? '결과 숨기기' : '상세 결과 보기'}
          </button>
          <button className="btn" onClick={onRestart}>
            🔄 다시 게임하기
          </button>
        </div>

        {showDetails && (
          <div className="result-details slide-in">
            <h3>📋 최종 결과</h3>
            <div className="players-results">
              {players.map((player, index) => (
                <div key={player.id} className="player-result">
                  <div className="result-rank">
                    <span className="rank-number">{index + 1}</span>
                  </div>
                  <div className="result-player-avatar">
                    {player.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="result-player-info">
                    <span className="result-player-name">{player.name}</span>
                    <span className={`role-badge role-badge-${getRoleBadgeClass(player.role)}`}>
                      {getRoleEmoji(player.role)} {player.role}
                    </span>
                  </div>
                  <div className="result-status">
                    <span className={`status-badge ${player.isAlive ? 'alive' : 'dead'}`}>
                      {player.isAlive ? '🟢 생존' : '💀 사망'}
                    </span>
                  </div>
                  <div className="result-points">
                    {player.role === '스파이' && (
                      <span className="spy-points-display">
                        🎯 {player.spyPoints || 0}점
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="game-statistics">
              <h4>📈 게임 통계</h4>
              <div className="stats-grid">
                <div className="stat-item">
                  <span className="stat-label">총 플레이어</span>
                  <span className="stat-value">{players.length}명</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">생존자</span>
                  <span className="stat-value">{players.filter(p => p.isAlive).length}명</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">사망자</span>
                  <span className="stat-value">{players.filter(p => !p.isAlive).length}명</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">마피아 수</span>
                  <span className="stat-value">{players.filter(p => p.role === '마피아').length}명</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameResult;
