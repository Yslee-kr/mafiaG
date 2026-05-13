import React, { useState, useEffect } from 'react';
import './VotingPhase.css';

const VotingPhase = ({ players, currentPlayer, onVote, onExecute, round }) => {
  const [hasVoted, setHasVoted] = useState(false);
  const [selectedTarget, setSelectedTarget] = useState(null);
  const [votingResults, setVotingResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60); // 1분 투표 시간
  const [voteHackUsed, setVoteHackUsed] = useState(false);
  const [hackedVotes, setHackedVotes] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          finishVoting();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleVote = (targetId) => {
    if (!hasVoted && targetId !== currentPlayer.id) {
      setSelectedTarget(targetId);
      setHasVoted(true);
      onVote(currentPlayer.id, targetId);

      // 투표 결과 업데이트
      const updatedResults = [...votingResults];
      const existingResult = updatedResults.find(r => r.voterId === currentPlayer.id);
      if (existingResult) {
        existingResult.targetId = targetId;
      } else {
        updatedResults.push({
          voterId: currentPlayer.id,
          voterName: currentPlayer.name,
          targetId: targetId,
          targetName: players.find(p => p.id === targetId)?.name
        });
      }
      setVotingResults(updatedResults);

      // 다른 플레이어 투표 시뮬레이션
      simulateOtherVotes();
    }
  };

  const handleVoteHack = () => {
    if (currentPlayer.role === '특수요원' && !voteHackUsed) {
      // 특수요원 투표 해킹: 랜덤으로 2-3명의 표를 다른 사람에게 변경
      const alivePlayers = players.filter(p => p.isAlive);
      const hackTargets = alivePlayers
        .filter(p => p.id !== currentPlayer.id)
        .sort(() => Math.random() - 0.5)
        .slice(0, Math.min(3, alivePlayers.length - 1));

      const newHackedVotes = hackTargets.map(target => {
        const newTarget = alivePlayers.find(p => p.id !== target.id && p.id !== currentPlayer.id);
        return {
          originalVoterId: target.id,
          originalVoterName: target.name,
          newTargetId: newTarget.id,
          newTargetName: newTarget.name
        };
      });

      setHackedVotes(newHackedVotes);
      setVoteHackUsed(true);

      // 해킹된 표를 결과에 반영
      const updatedResults = [...votingResults];
      newHackedVotes.forEach(hack => {
        const existingVote = updatedResults.find(r => r.voterId === hack.originalVoterId);
        if (existingVote) {
          existingVote.targetId = hack.newTargetId;
          existingVote.targetName = hack.newTargetName;
          existingVote.isHacked = true;
        }
      });

      setVotingResults(updatedResults);
    }
  };

  const simulateOtherVotes = () => {
    const alivePlayers = players.filter(p => p.isAlive && p.id !== currentPlayer.id);
    const unvotedPlayers = alivePlayers.filter(p => !votingResults.find(r => r.voterId === p.id));

    setTimeout(() => {
      unvotedPlayers.forEach((player, index) => {
        setTimeout(() => {
          const possibleTargets = players.filter(p => p.isAlive && p.id !== player.id);
          const randomTarget = possibleTargets[Math.floor(Math.random() * possibleTargets.length)];

          onVote(player.id, randomTarget.id);

          const updatedResults = [...votingResults];
          updatedResults.push({
            voterId: player.id,
            voterName: player.name,
            targetId: randomTarget.id,
            targetName: randomTarget.name
          });
          setVotingResults(updatedResults);
        }, index * 1000);
      });
    }, 2000);
  };

  const finishVoting = () => {
    setShowResults(true);

    // 모든 플레이어 투표 완료 확인
    const alivePlayers = players.filter(p => p.isAlive);
    if (votingResults.length < alivePlayers.length) {
      // 미투표자들 랜덤 투표
      const unvotedPlayers = alivePlayers.filter(p => !votingResults.find(r => r.voterId === p.id));
      unvotedPlayers.forEach(player => {
        const possibleTargets = players.filter(p => p.isAlive && p.id !== player.id);
        const randomTarget = possibleTargets[Math.floor(Math.random() * possibleTargets.length)];

        onVote(player.id, randomTarget.id);

        const updatedResults = [...votingResults];
        updatedResults.push({
          voterId: player.id,
          voterName: player.name,
          targetId: randomTarget.id,
          targetName: randomTarget.name
        });
        setVotingResults(updatedResults);
      });
    }
  };

  const executeElimination = () => {
    onExecute();
  };

  const getVoteCount = (targetId) => {
    return votingResults.filter(r => r.targetId === targetId).length;
  };

  const getVotePercentage = (targetId) => {
    const alivePlayers = players.filter(p => p.isAlive).length;
    const votes = getVoteCount(targetId);
    return Math.round((votes / alivePlayers) * 100);
  };

  const maxVotes = Math.max(...players.filter(p => p.isAlive).map(p => getVoteCount(p.id)));
  const threshold = Math.floor(players.filter(p => p.isAlive).length / 2) + 1;
  const eliminated = players.filter(p => p.isAlive && getVoteCount(p.id) >= threshold);

  return (
    <div className="voting-phase fade-in">
      <div className="card voting-card">
        <h2 className="card-title">🗳️ 투표 단계</h2>

        <div className="voting-header">
          <div className="timer">
            <span className={`timer-display ${timeLeft < 10 ? 'warning' : ''}`}>
              ⏱️ 남은 시간: {formatTime(timeLeft)}
            </span>
          </div>
          <div className="voting-status">
            {hasVoted ? (
              <span className="voted-status">✅ 투표 완료</span>
            ) : (
              <span className="pending-status">⏳ 투표 대기 중</span>
            )}
          </div>
        </div>

        {!showResults ? (
          <div className="voting-area">
            <div className="voting-instructions">
              <h3>📋 투표 안내</h3>
              <p>의심 가는 플레이어를 선택하여 투표하세요.</p>
              <p>생존자의 과반수가 넘는 표를 얻은 플레이어는 처형됩니다.</p>
            </div>

            <div className="voting-grid">
              {players.filter(p => p.isAlive).map(player => (
                <div
                  key={player.id}
                  className={`voting-target ${player.id === currentPlayer.id ? 'self' : ''} ${selectedTarget === player.id ? 'selected' : ''}`}
                  onClick={() => handleVote(player.id)}
                >
                  <div className="target-avatar">
                    {player.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="target-info">
                    <span className="target-name">{player.name}</span>
                    {player.id === currentPlayer.id && (
                      <span className="self-label">본인</span>
                    )}
                  </div>
                  {selectedTarget === player.id && (
                    <div className="vote-indicator">
                      <span className="vote-icon">✅</span>
                      <span>투표 완료</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {currentPlayer.role === '특수요원' && !voteHackUsed && (
              <div className="agent-hack-section">
                <h4>💻 특수요원 능력</h4>
                <p className="hack-description">투표를 해킹하여 다른 플레이어들의 표을 변경할 수 있습니다</p>
                <button className="btn btn-hack" onClick={handleVoteHack}>
                  🔓 투표 해킹 사용
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="voting-results">
            <h3>📊 투표 결과</h3>

            <div className="results-grid">
              {players.filter(p => p.isAlive).map(player => {
                const voteCount = getVoteCount(player.id);
                const votePercentage = getVotePercentage(player.id);
                const isEliminated = voteCount >= threshold;
                const hasMaxVotes = voteCount === maxVotes && voteCount > 0;

                return (
                  <div
                    key={player.id}
                    className={`result-item ${isEliminated ? 'eliminated' : ''} ${hasMaxVotes ? 'max-votes' : ''}`}
                  >
                    <div className="result-avatar">
                      {player.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="result-info">
                      <span className="result-name">{player.name}</span>
                      <div className="vote-stats">
                        <span className="vote-count">{voteCount}표</span>
                        <span className="vote-percentage">({votePercentage}%)</span>
                      </div>
                      {isEliminated && (
                        <div className="elimination-badge">
                          <span>🔫 처형</span>
                        </div>
                      )}
                      {hasMaxVotes && !isEliminated && (
                        <div className="close-call-badge">
                          <span>⚠️ 과반수 미달</span>
                        </div>
                      )}
                    </div>
                    <div className="vote-bar">
                      <div
                        className="vote-fill"
                        style={{ width: `${votePercentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="voting-summary">
              <div className="summary-item">
                <span className="summary-label">총 투표수</span>
                <span className="summary-value">{votingResults.length}표</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">처형 기준</span>
                <span className="summary-value">{threshold}표 이상</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">처형 대상</span>
                <span className="summary-value">
                  {eliminated.length > 0 ? eliminated.map(p => p.name).join(', ') : '없음'}
                </span>
              </div>
              {currentPlayer.role === '스파이' && eliminated.length > 0 && (
                <div className="spy-points-summary">
                  <span className="spy-points-label">🎯 스파이 포인트 획득:</span>
                  <span className="spy-points-value">
                    {eliminated.filter(p => p.role === '마피아').length > 0 ? '+1점' : '+0점'}
                  </span>
                </div>
              )}
            </div>

            <div className="voting-actions">
              <button className="btn btn-danger" onClick={executeElimination}>
                {eliminated.length > 0 ? '🔫 처형 집행' : '➡️ 다음 라운드'}
              </button>
            </div>
          </div>
        )}

        {!showResults && (
          <div className="voting-progress">
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${((60 - timeLeft) / 60) * 100}%` }}
              ></div>
            </div>
            <p className="progress-text">
              투표 진행률: {votingResults.length}/{players.filter(p => p.isAlive).length}명 투표 완료
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VotingPhase;
