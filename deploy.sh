#!/bin/bash

# GitHub Pages 배포 스크립트
echo "🚀 GitHub Pages 배포 시작..."

# 빌드
echo "📦 프로젝트 빌드 중..."
npm run build

# 배포
echo "📤 GitHub Pages에 배포 중..."
npm run deploy

echo "✅ 배포 완료!"
echo "🌐 https://[username].github.io/mafia 에서 확인하세요"
