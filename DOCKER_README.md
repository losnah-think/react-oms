# React OMS Docker 배포 가이드 🐳

## 📋 개요
이 문서는 React OMS 시스템을 Docker를 사용하여 배포하는 방법을 안내합니다.

## 🏗️ 시스템 요구사항
- Docker 28.0+ 
- Docker Compose v2.39+
- 최소 4GB RAM
- 최소 10GB 디스크 공간

## 📦 프로젝트 구조
```
react-oms/
├── Dockerfile              # Next.js 애플리케이션 컨테이너
├── docker-compose.yml      # 서비스 오케스트레이션
├── nginx.conf             # Nginx 리버스 프록시 설정
├── .dockerignore          # Docker 빌드 제외 파일
└── DOCKER_README.md       # 이 파일
```

## 🚀 배포 실행

### 단계별 배포 과정

#### 1. 환경 확인
```bash
# Docker 버전 확인
docker --version
docker compose version

# 필요 포트 확인 (5050, 5080)
lsof -i :5050
lsof -i :5080
```

#### 2. 애플리케이션 빌드 및 실행
```bash
# 프로젝트 디렉토리로 이동
cd /Users/sotatekthor/react-oms

# Option A: 기본 실행 (Next.js만)
docker compose up -d --build

# Option B: Nginx 포함 실행 (권장)
docker compose --profile with-nginx up -d --build
```

#### 3. 접속 확인
- **기본**: http://localhost:5050
- **Nginx**: http://localhost:5080

## 🔧 운영 명령어

### 기본 관리
```bash
# 서비스 상태 확인
docker compose ps

# 실시간 로그 확인
docker compose logs -f react-oms

# 서비스 중지
docker compose down

# 완전 정리 (볼륨 포함)
docker compose down -v --remove-orphans
```

### 고급 관리
```bash
# 리소스 사용량 모니터링
docker stats react-oms-app

# 컨테이너 내부 접근
docker compose exec react-oms sh

# 이미지 강제 재빌드
docker compose build --no-cache react-oms

# 서비스 재시작
docker compose restart react-oms
```

## 🔍 모니터링 및 디버깅

### 로그 분석
```bash
# 전체 로그 확인
docker compose logs

# 특정 서비스 로그
docker compose logs react-oms
docker compose logs nginx

# 최근 100줄만 확인
docker compose logs --tail=100 react-oms
```

### 성능 모니터링
```bash
# 실시간 리소스 사용량
docker stats

# 컨테이너 상세 정보
docker compose exec react-oms cat /proc/meminfo
docker compose exec react-oms df -h
```

## 🛠️ 트러블슈팅

### 일반적인 문제 해결

#### 1. 포트 충돌
```bash
# 에러: bind: address already in use
lsof -i :5050
kill -9 <PID>

# 또는 포트 변경
# docker-compose.yml에서 "5051:3000"로 변경
```

#### 2. 빌드 실패
```bash
# 캐시 제거 후 재빌드
docker system prune -f
docker compose build --no-cache
```

#### 3. 메모리 부족
```bash
# Docker Desktop에서 Resources > Memory 증가
# 또는 시스템 메모리 확인
free -h
```

#### 4. 권한 문제
```bash
# Docker 권한 확인 (Linux/Mac)
groups $USER | grep docker
# 없다면: sudo usermod -aG docker $USER
```

## ⚙️ 환경별 설정

### 개발 환경
```yaml
# docker-compose.override.yml
services:
  react-oms:
    environment:
      - NODE_ENV=development
      - NEXT_TELEMETRY_DISABLED=1
    volumes:
      - .:/app
      - /app/node_modules
```

### 프로덕션 환경
```yaml
# docker-compose.prod.yml
services:
  react-oms:
    environment:
      - NODE_ENV=production
      - NEXT_TELEMETRY_DISABLED=1
    restart: always
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
```

## 📊 성능 최적화

### 1. Docker 이미지 최적화
- ✅ Multi-stage build 사용
- ✅ Alpine Linux 경량 이미지
- ✅ .dockerignore 활용
- ✅ Non-root 사용자 실행

### 2. Next.js 최적화
- ✅ Standalone output 모드
- ✅ 프로덕션 빌드
- ✅ 정적 파일 최적화

### 3. Nginx 최적화
- ✅ Gzip 압축
- ✅ 정적 파일 캐싱
- ✅ 리버스 프록시 최적화

## 🔐 보안 설정

### 기본 보안
- ✅ Non-root 사용자 실행
- ✅ 최소 권한 원칙
- ✅ 불필요한 포트 비노출

### 추가 보안 (선택사항)
```yaml
# SSL 설정 추가
volumes:
  - ./ssl:/etc/nginx/ssl:ro

# 보안 헤더 설정
# nginx.conf에 추가
```

## 📈 확장 계획

### 단기 계획
- [ ] Health Check 구현
- [ ] 로그 중앙화 (ELK Stack)
- [ ] 모니터링 대시보드 (Grafana)

### 장기 계획
- [ ] Kubernetes 마이그레이션
- [ ] CI/CD 파이프라인
- [ ] 마이크로서비스 분리

## 📋 배포 체크리스트

### 배포 전
- [ ] Docker 설치 확인
- [ ] 포트 사용가능 확인 (5050, 5080)
- [ ] 시스템 리소스 확인 (4GB+ RAM)
- [ ] 환경 변수 설정 완료

### 배포 중
- [ ] `docker compose up -d --build` 실행
- [ ] 빌드 로그 에러 없음 확인
- [ ] 컨테이너 정상 시작 확인

### 배포 후
- [ ] 웹사이트 접속 확인 (http://localhost:5050)
- [ ] 모든 페이지 정상 동작 확인
- [ ] 리소스 사용량 모니터링
- [ ] 로그 에러 없음 확인

## 🚀 현재 배포 진행

이제 실제 배포를 진행하겠습니다!

---

**작성일**: 2024년 1월 15일  
**버전**: v1.0.0  
**Docker**: 28.3.3  
**Docker Compose**: v2.39.2
