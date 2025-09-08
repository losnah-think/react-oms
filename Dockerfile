# Node.js 18 Alpine 이미지 사용
FROM node:18-alpine AS base

# 의존성 설치를 위한 단계
FROM base AS deps
# libc6-compat 설치 (Alpine에서 호환성을 위해)
RUN apk add --no-cache libc6-compat
WORKDIR /app

# package.json과 package-lock.json 복사 (있다면)
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Next.js 빌드를 위한 단계
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js telemetry 비활성화
ENV NEXT_TELEMETRY_DISABLED 1

# Next.js 애플리케이션 빌드
RUN npm run build

# 프로덕션 실행을 위한 단계
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# 자동으로 생성된 standalone 설정 활용
RUN mkdir .next
RUN chown nextjs:nodejs .next

# 빌드된 애플리케이션 복사
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# 서버 시작
CMD ["node", "server.js"]
