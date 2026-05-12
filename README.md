# 🕵️ 첩보국 마피아 스파이

![GitHub Pages](https://img.shields.io/badge/GitHub-Pages-blue?style=flat-square)
![React](https://img.shields.io/badge/React-18.2.0-blue?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

첩보국을 배경으로 한 마피아 게임! 친구들과 함께하는 추리 게임으로, 마피아를 찾아내거나 마피아가 되어 생존하는 것이 목표입니다.

## 🎮 게임 특징

- **🎭 다양한 역할**: 시민, 마피아, 스파이, 특수요원
- **📋 사건 브리핑 시스템**: 각자 다른 단서를 받아 퍼즐 맞추기
- **💬 실시간 토론**: 채팅으로 마피아 색출
- **🗳️ 투표 시스템**: 과반수 투표로 처형 집행
- **🎯 특수 이벤트**: 해킹, 신분 세탁 등 다양한 이벤트
- **📱 반응형 디자인**: 모바일 최적화

## 🎯 게임 목표

### 시민 진영
- 사건의 단서를 모아 마피아를 추리
- 과반수 투표로 마피아 처형

### 마피아
- 정체를 숨기고 시민인 척 연기
- 끝까지 생존하여 마피아 진영 승리

### 스파이
- 마피아에게 투표하여 스파이 포인트 획득
- 4점 달성 시 단독 우승

### 특수요원
- 특정 라운드마다 투표 해킹 능력 보유
- 다른 플레이어의 투표 정보 확인 가능

## 🎮 게임 진행

1. **게임 설정**: 플레이어 추가 및 역할 배정
2. **사건 브리핑**: 각자 다른 단서 확인
3. **토론 단계**: 채팅으로 마피아 추리
4. **투표 단계**: 의심 가는 플레이어 투표
5. **결과 발표**: 처형 집행 및 승리 조건 확인

## 🚀 빠른 시작

### GitHub Pages에서 바로 플레이

1. 이 저장소를 포크(Fork)하세요
2. GitHub Pages 설정에서 소스를 `gh-pages` 브랜치로 변경
3. 몇 분 후 게임이 배포됩니다

### 로컬에서 실행

```bash
# 저장소 클론
git clone https://github.com/[username]/mafia.git
cd mafia

# 의존성 설치
npm install

# 개발 서버 시작
npm start
```

브라우저에서 `http://localhost:3000`으로 접속하세요.

## 📦 배포

### GitHub Pages 자동 배포

```bash
# 빌드 및 배포
npm run deploy
```

이 명령은 `build` 폴더를 생성하고 GitHub Pages에 자동으로 배포합니다.

## 🎮 게임 규칙 상세

### 사건 브리핑 시스템

- **시민 진영**: 진짜 장소 + 진짜 단서 2개
- **마피아**: 가짜 장소 + 진짜 단서 1개 + 가짜 단서 1개
- 각자 다른 조각의 단서를 공유하며 전체 사건 파악

### 특수 기믹

- **1급 기밀 해킹 (1라운드 한정)**: 50% 확률로 다른 플레이어 신분 확인
- **어둠의 거래 (매 5라운드)**: 신분 세탁 기회
- **피바람 이벤트**: 밸런스 불균형 시 러시안룰렛

### 승리 조건

- **시민 승리**: 모든 마피아 처형
- **마피아 승리**: 마피아 수 ≥ 시민 수
- **스파이 승리**: 스파이 포인트 4점 달성

## 🛠️ 기술 스택

- **Frontend**: React 18.2.0
- **Styling**: CSS3 with Flexbox & Grid
- **Icons**: Lucide React
- **Deployment**: GitHub Pages
- **Package Manager**: npm

## 📁 프로젝트 구조

```
mafia/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── GameSetup.js
│   │   ├── GameLobby.js
│   │   ├── ClueBriefing.js
│   │   ├── GameBoard.js
│   │   ├── VotingPhase.js
│   │   └── GameResult.js
│   ├── App.js
│   ├── App.css
│   └── index.js
├── package.json
├── README.md
└── .gitignore
```

## 🎮 플레이 방법

1. **게임 시작**: 3-10명의 플레이어 추가
2. **역할 확인**: 각자 역할을 비밀리에 확인
3. **단서 파악**: 사건 브리핑에서 단서 확인
4. **토론**: 채팅으로 마피아 추리
5. **투표**: 의심 가는 플레이어 선택
6. **반복**: 승리 조건 달성까지 반복

## 🤝 기여

버그 리포트, 기능 요청, 코드 기여는 언제나 환영합니다!

1. 이 저장소를 포크하세요
2. 기능 브랜치를 생성하세요 (`git checkout -b feature/AmazingFeature`)
3. 변경사항을 커밋하세요 (`git commit -m 'Add some AmazingFeature'`)
4. 브랜치에 푸시하세요 (`git push origin feature/AmazingFeature`)
5. Pull Request를 생성하세요

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 확인하세요.

## 🎮 온라인 플레이

현재는 로컬 플레이만 지원합니다. 온라인 멀티플레이어 기능은 개발 중입니다!

## 📞 연락처

질문이 있으시면 이슈를 생성하거나 아래로 연락주세요:

- GitHub Issues: [이슈 생성](https://github.com/[username]/mafia/issues)
- 이메일: [이메일 주소]

---

⭐ 즐거운 게임 되세요! ⭐
