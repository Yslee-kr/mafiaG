import React, { useState } from 'react';
import './GameLobby.css';

const GameLobby = ({ players, onStartGame, onSwitchPlayer, currentPlayer }) => {
  const [showRoleInfo, setShowRoleInfo] = useState(false);

  const getRoleEmoji = (role) => {
    const roleEmojis = {
      '시민': '🧑‍💼',
      '마피아': '🕴️',
      '스파이': '🕵️‍♂️',
      '특수요원': '💻'
    };
    return roleEmojis[role] || '❓';
  };

  const getRoleDescription = (role) => {
    const descriptions = {
      '시민': '사건의 단서를 모아 마피아를 추리하고 처형하세요!',
      '마피아': '자신의 정체를 숨기고 시민인 척 연기하며 생존하세요!',
      '스파이': '마피아에게 투표하여 스파이 포인트 4점을 모으면 단독 우승!',
      '특수요원': '특정 라운드마다 다른 플레이어의 투표를 해킹할 수 있습니다!'
    };
    return descriptions[role] || '';
  };

  return (
    <div className="game-lobby fade-in">
      <div className="card">
        <h2 className="card-title">🏠 게임 로비</h2>
        
        <div className="lobby-section">
          <h3>현재 플레이어</h3>
          <div className="current-player">
            <div className="player-avatar-large">
              {currentPlayer.name.charAt(0).toUpperCase()}
            </div>
            <div className="player-info">
              <h4>{currentPlayer.name}</h4>
              <div className="role-info">
                <span className="role-badge role-badge-unknown">
                  ❓ 역할 비밀
                </span>
                <button 
                  className="reveal-role-btn"
                  onClick={() => setShowRoleInfo(!showRoleInfo)}
                >
                  👁️ 역할 확인
                </button>
              </div>
            </div>
          </div>
          
          {showRoleInfo && (
            <div className="role-reveal slide-in">
              <div className="role-card">
                <span className="role-emoji">{getRoleEmoji(currentPlayer.role)}</span>
                <span className={`role-badge role-badge-${currentPlayer.role.toLowerCase()}`}>
                  {currentPlayer.role}
                </span>
                <p className="role-description">
                  {getRoleDescription(currentPlayer.role)}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="lobby-section">
          <h3>전체 플레이어 ({players.length}명)</h3>
          <div className="players-grid">
            {players.map((player, index) => (
              <div 
                key={player.id} 
                className={`player-card ${currentPlayer.id === player.id ? 'current' : ''}`}
                onClick={() => onSwitchPlayer(player.id)}
              >
                <div className="player-avatar">
                  {player.name.charAt(0).toUpperCase()}
                </div>
                <div className="player-details">
                  <span className="player-name">{player.name}</span>
                  {player.isHost && <span className="host-badge">방장</span>}
                  {currentPlayer.id === player.id && (
                    <span className="current-badge">현재</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lobby-section">
          <h3>게임 정보</h3>
          <div className="game-info-grid">
            <div className="info-item">
              <span className="info-label">총 플레이어</span>
              <span className="info-value">{players.length}명</span>
            </div>
            <div className="info-item">
              <span className="info-label">마피아 수</span>
              <span className="info-value">{Math.max(1, Math.floor(players.length / 4))}명</span>
            </div>
            <div className="info-item">
              <span className="info-label">스파이</span>
              <span className="info-value">{players.length >= 4 ? '1명' : '없음'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">특수요원</span>
              <span className="info-value">{players.length >= 6 ? '1명' : '없음'}</span>
            </div>
          </div>
        </div>

        <div className="lobby-section">
          <h3>📋 게임 진행 방식</h3>
          <div className="game-steps">
            <div className="step">
              <span className="step-number">1</span>
              <span className="step-text">사건 브리핑 확인</span>
            </div>
            <div className="step">
              <span className="step-number">2</span>
              <span className="step-text">전체 채팅 토론</span>
            </div>
            <div className="step">
              <span className="step-number">3</span>
              <span className="step-text">투표 진행</span>
            </div>
            <div className="step">
              <span className="step-number">4</span>
              <span className="step-text">처형 집행</span>
            </div>
          </div>
        </div>

        <div className="lobby-actions">
          <button 
            className="btn"
            onClick={onStartGame}
          >
            🎮 게임 시작하기
          </button>
          <p className="start-hint">
            💡 모든 플레이어가 자신의 역할을 확인한 후 시작하세요!
          </p>
        </div>
      </div>
    </div>
  );
};

export default GameLobby;
