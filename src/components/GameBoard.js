import React, { useState, useEffect, useRef } from 'react';
import './GameBoard.css';

const GameBoard = ({ players, currentPlayer, onSwitchPlayer, onStartVoting, gameData, round }) => {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [timeLeft, setTimeLeft] = useState(180); // 3분
  const [specialEvents, setSpecialEvents] = useState([]);
  const [showVoteInfo, setShowVoteInfo] = useState(false);
  const [hackingUsed, setHackingUsed] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    // 타이머
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          onStartVoting();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onStartVoting]);

  useEffect(() => {
    // 스크롤을 맨 아래로
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    // 특수 이벤트 체크
    if (gameData && gameData.specialEvents) {
      setSpecialEvents(gameData.specialEvents);
    }
  }, [gameData]);

  const checkSpecialEvents = () => {
    const events = [];

    // 1라운드 1급 기밀 해킹
    if (Math.random() < 0.3) { // 30% 확률
      events.push({
        id: 'hacking',
        name: '1급 기밀 해킹',
        description: '다른 플레이어의 신분을 50% 확률로 캘 수 있습니다',
        type: 'hacking'
      });
    }

    setSpecialEvents(events);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const sendMessage = () => {
    if (currentMessage.trim()) {
      const newMessage = {
        id: Date.now(),
        author: currentPlayer.name,
        text: currentMessage.trim(),
        timestamp: new Date().toLocaleTimeString('ko-KR', {
          hour: '2-digit',
          minute: '2-digit'
        }),
        isOwn: true
      };
      setMessages([...messages, newMessage]);
      setCurrentMessage('');

      // 시뮬레이션: 다른 플레이어들의 메시지
      setTimeout(() => {
        simulateOtherPlayers();
      }, 2000);
    }
  };

  const simulateOtherPlayers = () => {
    const alivePlayers = players.filter(p => p.isAlive && p.id !== currentPlayer.id);
    if (alivePlayers.length > 0) {
      const randomPlayer = alivePlayers[Math.floor(Math.random() * alivePlayers.length)];
      const sampleMessages = [
        '다들 장소 어딘지 알지?',
        '나는 이상한 소리를 들었어...',
        '누구 봤어?',
        '마피아는 분명 우리 중에 있어',
        '단서를 잘 살펴보자',
        '거짓말하는 사람이 있을 거야'
      ];

      const randomMessage = sampleMessages[Math.floor(Math.random() * sampleMessages.length)];

      const simulatedMessage = {
        id: Date.now() + 1,
        author: randomPlayer.name,
        text: randomMessage,
        timestamp: new Date().toLocaleTimeString('ko-KR', {
          hour: '2-digit',
          minute: '2-digit'
        }),
        isOwn: false
      };

      setMessages(prev => [...prev, simulatedMessage]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleSpecialEvent = (event) => {
    if (event.type === 'hacking') {
      const targetPlayer = players.filter(p => p.isAlive && p.id !== currentPlayer.id)[Math.floor(Math.random() * (players.filter(p => p.isAlive && p.id !== currentPlayer.id).length))];
      const success = Math.random() < 0.5;

      const hackMessage = {
        id: Date.now(),
        author: '시스템',
        text: success
          ? `🔓 해킹 성공! ${targetPlayer.name}는(은) ${targetPlayer.role}입니다!`
          : '❌ 해킹 실패... 아무 정보도 얻지 못했습니다.',
        timestamp: new Date().toLocaleTimeString('ko-KR', {
          hour: '2-digit',
          minute: '2-digit'
        }),
        isOwn: false,
        isSystem: true
      };

      setMessages(prev => [...prev, hackMessage]);
      setSpecialEvents(prev => prev.filter(e => e.id !== event.id));
      setHackingUsed(true);
    } else if (event.type === 'identity_wash') {
      // 신분 세탁 이벤트
      const washMessage = {
        id: Date.now(),
        author: '시스템',
        text: '🌙 어둠의 거래가 시작됩니다. 신분을 바꿀 기회가 주어집니다...',
        timestamp: new Date().toLocaleTimeString('ko-KR', {
          hour: '2-digit',
          minute: '2-digit'
        }),
        isOwn: false,
        isSystem: true
      };

      setMessages(prev => [...prev, washMessage]);
      setSpecialEvents(prev => prev.filter(e => e.id !== event.id));
    } else if (event.type === 'russian_roulette') {
      // 피바람 이벤트 (러시안룰렛)
      const alivePlayers = players.filter(p => p.isAlive);
      const randomTarget = alivePlayers[Math.floor(Math.random() * alivePlayers.length)];

      const rouletteMessage = {
        id: Date.now(),
        author: '시스템',
        text: `💀 피바람 이벤트! ${randomTarget.name}가(이) 러시안룰렛에 참가합니다...`,
        timestamp: new Date().toLocaleTimeString('ko-KR', {
          hour: '2-digit',
          minute: '2-digit'
        }),
        isOwn: false,
        isSystem: true
      };

      setMessages(prev => [...prev, rouletteMessage]);

      setTimeout(() => {
        const survived = Math.random() < 0.5;
        const resultMessage = {
          id: Date.now() + 1,
          author: '시스템',
          text: survived
            ? `✨ ${randomTarget.name}가(이) 살아남았습니다!`
            : `💔 ${randomTarget.name}가(이) 사망했습니다...`,
          timestamp: new Date().toLocaleTimeString('ko-KR', {
            hour: '2-digit',
            minute: '2-digit'
          }),
          isOwn: false,
          isSystem: true
        };
        setMessages(prev => [...prev, resultMessage]);
      }, 3000);

      setSpecialEvents(prev => prev.filter(e => e.id !== event.id));
    }
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

  return (
    <div className="game-board fade-in">
      <div className="board-container">
        {/* 왼쪽 패널: 플레이어 목록 */}
        <div className="left-panel">
          <div className="card">
            <h3 className="panel-title">👥 플레이어 목록</h3>
            <div className="players-list">
              {players.filter(p => p.isAlive).map(player => (
                <div
                  key={player.id}
                  className={`player-item ${currentPlayer.id === player.id ? 'current' : ''}`}
                  onClick={() => onSwitchPlayer(player.id)}
                >
                  <div className="player-avatar">
                    {player.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="player-info">
                    <span className="player-name">{player.name}</span>
                    {currentPlayer.id === player.id && (
                      <span className={`role-badge role-badge-${getRoleBadgeClass(player.role)}`}>
                        {player.role}
                      </span>
                    )}
                  </div>
                  <div className="player-status">
                    {player.isAlive ? '🟢' : '💀'}
                  </div>
                </div>
              ))}
            </div>

            {specialEvents.length > 0 && (
              <div className="special-events">
                <h4>🎯 특수 이벤트</h4>
                {specialEvents.map(event => (
                  <div key={event.id} className="event-item">
                    <div className="event-info">
                      <span className="event-name">{event.name}</span>
                      <span className="event-desc">{event.description}</span>
                    </div>
                    <button
                      className="event-btn"
                      onClick={() => handleSpecialEvent(event)}
                      disabled={event.type === 'hacking' && hackingUsed}
                    >
                      실행
                    </button>
                  </div>
                ))}
              </div>
            )}

            {currentPlayer.role === '특수요원' && (
              <div className="agent-abilities">
                <h4>💻 특수요원 능력</h4>
                <button
                  className="ability-btn"
                  onClick={() => setShowVoteInfo(!showVoteInfo)}
                >
                  {showVoteInfo ? '투표 정보 숨기기' : '투표 정보 보기'}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 중앙 패널: 채팅 */}
        <div className="center-panel">
          <div className="card chat-card">
            <div className="chat-header">
              <h3>💬 토론 방</h3>
              <div className="timer">
                <span className={`timer-display ${timeLeft < 30 ? 'warning' : ''}`}>
                  ⏱️ {formatTime(timeLeft)}
                </span>
              </div>
            </div>

            <div className="chat-messages">
              {messages.map(message => (
                <div
                  key={message.id}
                  className={`chat-message ${message.isOwn ? 'own' : ''} ${message.isSystem ? 'system' : ''}`}
                >
                  <div className="message-header">
                    <span className="message-author">{message.author}</span>
                    <span className="message-time">{message.timestamp}</span>
                  </div>
                  <div className="message-text">{message.text}</div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            <div className="chat-input">
              <textarea
                className="input chat-textarea"
                placeholder="메시지를 입력하세요..."
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                rows={2}
              />
              <button className="btn" onClick={sendMessage}>
                전송
              </button>
            </div>
          </div>
        </div>

        {/* 오른쪽 패널: 게임 정보 */}
        <div className="right-panel">
          <div className="card">
            <h3 className="panel-title">📊 게임 정보</h3>
            <div className="game-stats">
              <div className="stat-item">
                <span className="stat-label">생존자</span>
                <span className="stat-value">{players.filter(p => p.isAlive).length}명</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">사망자</span>
                <span className="stat-value">{players.filter(p => !p.isAlive).length}명</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">라운드</span>
                <span className="stat-value">{round}라운드</span>
              </div>
              {currentPlayer.role === '스파이' && (
                <div className="stat-item">
                  <span className="stat-label">스파이 포인트</span>
                  <span className="stat-value">{currentPlayer.spyPoints || 0}점</span>
                </div>
              )}
            </div>

            <div className="role-distribution">
              <h4>역할 분포 (추정)</h4>
              <div className="role-item">
                <span className="role-icon">🧑‍💼</span>
                <span className="role-name">시민</span>
                <span className="role-count">{Math.max(1, players.length - Math.max(1, Math.floor(players.length / 4)) - (players.length >= 4 ? 1 : 0) - (players.length >= 6 ? 1 : 0))}명</span>
              </div>
              <div className="role-item">
                <span className="role-icon">🕴️</span>
                <span className="role-name">마피아</span>
                <span className="role-count">{Math.max(1, Math.floor(players.length / 4))}명</span>
              </div>
              {players.length >= 4 && (
                <div className="role-item">
                  <span className="role-icon">🕵️‍♂️</span>
                  <span className="role-name">스파이</span>
                  <span className="role-count">1명</span>
                </div>
              )}
              {players.length >= 6 && (
                <div className="role-item">
                  <span className="role-icon">💻</span>
                  <span className="role-name">특수요원</span>
                  <span className="role-count">1명</span>
                </div>
              )}
            </div>

            <button className="btn btn-danger" onClick={onStartVoting}>
              🗳️ 투표 시작
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
