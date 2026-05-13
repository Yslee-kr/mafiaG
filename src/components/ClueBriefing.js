import React, { useState, useEffect } from 'react';
import './ClueBriefing.css';

const ClueBriefing = ({ currentPlayer, onNextPhase }) => {
  const [showClues, setShowClues] = useState(false);
  const [memorizedClues, setMemorizedClues] = useState(false);

  useEffect(() => {
    // 3초 후 자동으로 단서 표시
    const timer = setTimeout(() => {
      setShowClues(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleMemorize = () => {
    setMemorizedClues(true);
    setTimeout(() => {
      onNextPhase();
    }, 2000);
  };

  if (!currentPlayer || !currentPlayer.briefing) {
    return <div>로딩 중...</div>;
  }

  const { location, clues, roundType, discoveryMessage } = currentPlayer.briefing;

  return (
    <div className={`clue-briefing fade-in ${roundType === 'subsequent' ? 'subsequent-round' : ''}`}>
      <div className="card briefing-card">
        <h2 className="card-title">📋 사건 브리핑</h2>

        <div className="briefing-header">
          <div className="classification">
            <span className="classification-stamp">🔒 기밀</span>
            <span className="classification-level">1급 보안</span>
          </div>
          <div className="briefing-time">
            <span>🕐 브리핑 시간: {new Date().toLocaleTimeString('ko-KR')}</span>
          </div>
        </div>

        <div className="briefing-content">
          <div className="mission-title">
            <h3>
              {roundType === 'first' ? '🌙 어젯밤 끔찍한 사건' : '🔍 새로운 단서 발견'}
            </h3>
            <p>
              {roundType === 'first'
                ? '첩보국 내부에서 발생한 비극적인 사건에 대한 기밀 정보입니다.'
                : discoveryMessage || '새로운 단서가 발견되었습니다.'}
            </p>
          </div>

          {!showClues ? (
            <div className="briefing-loading">
              <div className="loading-spinner"></div>
              <p>🔐 보안 인증 중...</p>
              <p className="loading-hint">
                {roundType === 'first'
                  ? '기밀 정보에 접근하기 위해 신원 확인을 진행합니다'
                  : '새로운 단서를 분석 중입니다...'}
              </p>
            </div>
          ) : (
            <div className="clues-reveal slide-in">
              {roundType === 'first' && (
                <div className="clue-section">
                  <h4>📍 사건 장소</h4>
                  <div className="clue-item location-clue">
                    <span className="clue-icon">🏢</span>
                    <span className="clue-text">{location}</span>
                  </div>
                </div>
              )}

              {clues.length > 0 && (
                <div className="clue-section">
                  <h4>
                    {roundType === 'first' ? '🔍 발견된 단서' : '🔍 새로운 단서'}
                  </h4>
                  <div className="clues-grid">
                    {clues.map((clue, index) => (
                      <div key={index} className="clue-item">
                        <span className="clue-icon">🔍</span>
                        <span className="clue-text">{clue}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {roundType === 'subsequent' && (
                <div className="discovery-announcement">
                  <div className="announcement-content">
                    <span className="announcement-icon">🔍</span>
                    <span className="announcement-text">{discoveryMessage}</span>
                  </div>
                </div>
              )}

              <div className="briefing-instructions">
                <h4>📝 임무 지시</h4>
                <div className="instructions-list">
                  {currentPlayer.role === '마피아' ? (
                    <>
                      <div className="instruction-item">
                        <span className="instruction-icon">🎭</span>
                        <span>자신이 마피아라는 사실을 철저히 숨기세요</span>
                      </div>
                      <div className="instruction-item">
                        <span className="instruction-icon">👂</span>
                        <span>시민들의 대화를 엿들어 진짜 장소를 파악하세요</span>
                      </div>
                      <div className="instruction-item">
                        <span className="instruction-icon">🎯</span>
                        <span>자신과 겹치는 진짜 단서를 말하는 사람에게 접근하세요</span>
                      </div>
                    </>
                  ) : currentPlayer.role === '스파이' ? (
                    <>
                      <div className="instruction-item">
                        <span className="instruction-icon">🕵️</span>
                        <span>마피아가 누구인지 눈치채세요</span>
                      </div>
                      <div className="instruction-item">
                        <span className="instruction-icon">🎯</span>
                        <span>마피아에게 투표하여 스파이 포인트를 모으세요</span>
                      </div>
                      <div className="instruction-item">
                        <span className="instruction-icon">🏆</span>
                        <span>스파이 포인트 4점 달성 시 단독 우승!</span>
                      </div>
                    </>
                  ) : currentPlayer.role === '특수요원' ? (
                    <>
                      <div className="instruction-item">
                        <span className="instruction-icon">💻</span>
                        <span>특정 라운드마다 투표 해킹 능력을 사용할 수 있습니다</span>
                      </div>
                      <div className="instruction-item">
                        <span className="instruction-icon">🔍</span>
                        <span>다른 플레이어의 투표 정보를 분석하세요</span>
                      </div>
                      <div className="instruction-item">
                        <span className="instruction-icon">🤝</span>
                        <span>시민들과 협력하여 마피아를 찾아내세요</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="instruction-item">
                        <span className="instruction-icon">🤝</span>
                        <span>다른 시민들과 단서를 공유하여 전체 사건을 파악하세요</span>
                      </div>
                      <div className="instruction-item">
                        <span className="instruction-icon">🔍</span>
                        <span>거짓말을 하는 마피아를 색출하세요</span>
                      </div>
                      <div className="instruction-item">
                        <span className="instruction-icon">⚖️</span>
                        <span>투표를 통해 마피아를 처형하세요</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="security-warning">
                <h4>⚠️ 보안 경고</h4>
                <p>이 정보는 오직 당신만이 접근할 수 있는 1급 기밀입니다. 다른 플레이어에게 절대 공개하지 마세요.</p>
              </div>
            </div>
          )}
        </div>

        {showClues && !memorizedClues && (
          <div className="briefing-actions">
            <button className="btn" onClick={handleMemorize}>
              🧠 단서 암기 완료
            </button>
            <p className="action-hint">
              💡 단서를 외운 후 버튼을 누르면 토론 단계로 진행됩니다
            </p>
          </div>
        )}

        {memorizedClues && (
          <div className="briefing-complete">
            <div className="complete-message">
              <span className="complete-icon">✅</span>
              <span>브리핑 완료 - 토론 준비 중...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClueBriefing;
