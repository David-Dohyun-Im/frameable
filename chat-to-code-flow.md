# 채팅에서 코딩까지의 과정 분석

## 전체 플로우 개요

이 프로젝트는 사용자의 채팅 입력을 받아서 실제 코드를 생성하고 실행하는 AI 기반 개발 플랫폼입니다.

## 0. 앱 생성 과정 - Git Clone 단계

### 0.1 초기 사용자 입력 (`src/app/page.tsx`)
- 홈페이지에서 사용자가 프로젝트 설명을 입력
- 예시: "Build a landing page for an AI native ERP system"
- 입력 후 `/app/new?message=...` 경로로 리다이렉트

### 0.2 새 앱 생성 페이지 (`src/app/app/new/page.tsx`)
- 사용자 인증 확인 후 `createApp` 액션 호출
- 초기 메시지를 URL 파라미터에서 디코딩

### 0.3 앱 생성 액션 (`src/actions/create-app.ts`)
**핵심 Git Clone 과정:**

1. **템플릿 선택** (`src/lib/template-selector.ts`)
   - 사용자 입력을 분석하여 적절한 템플릿 선택
   - 키워드 기반 매칭 (portfolio, newsletter, ecommerce, ai)
   - 예: "AI" 키워드 감지 시 AI 템플릿 선택

2. **Git 저장소 생성 및 Clone**
   ```typescript
   const repo = await freestyle.createGitRepository({
     name: "Unnamed App",
     public: true,
     source: {
       type: "git",
       url: templateSelection.selectedTemplate.repo, // GitHub URL
     },
   });
   ```
   - Freestyle API를 통해 GitHub 저장소를 복제
   - 예: `https://github.com/zachhere/yourai` (AI 템플릿)

3. **개발 서버 요청**
   ```typescript
   const devServerResult = await freestyle.requestDevServer({
     repoId: repo.repoId,
   });
   ```
   - 복제된 저장소에 대한 개발 서버 생성
   - MCP (Model Context Protocol) 엔드포인트 제공
   - 파일시스템 접근 권한 설정

4. **데이터베이스 저장**
   - 앱 정보를 PostgreSQL에 저장
   - 사용자 권한 및 Freestyle 토큰 연결

5. **메모리 스레드 생성**
   - Mastra 메모리 시스템에 새 대화 스레드 생성

6. **초기 메시지 전송**
   - 사용자의 초기 입력을 AI에게 전송하여 첫 번째 응답 시작

## 1. 프론트엔드 - 사용자 입력

### 1.1 Chat 컴포넌트 (`src/components/chat.tsx`)
- 사용자의 메시지와 이미지를 받는 메인 채팅 인터페이스
- `PromptInputBasic` 컴포넌트를 통해 사용자 입력 처리
- `useChatSafe` 훅을 사용하여 채팅 상태 관리

### 1.2 PromptInputBasic (`src/components/chatinput.tsx`)
- 텍스트 입력과 이미지 업로드 지원
- 이미지 압축 기능 포함
- 입력 데이터를 `Chat` 컴포넌트로 전달

### 1.3 useChatSafe (`src/components/use-chat.tsx`)
- AI SDK의 `useChat` 훅을 래핑
- 개발 모드에서 중복 스트림 방지
- 채팅 상태 관리 및 스트림 재개 기능

## 2. API 라우트 - 백엔드 처리

### 2.1 POST `/api/chat/route.ts`
- 사용자 메시지를 받아서 처리하는 메인 엔드포인트
- 기존 스트림이 실행 중이면 중지 후 새 스트림 시작
- Freestyle 개발 서버 요청
- `sendMessageWithStreaming` 함수 호출

### 2.2 DELETE `/api/chat/[id]/stream/route.ts`
- 실행 중인 스트림을 중지하는 엔드포인트
- Redis를 통해 스트림 상태 관리

## 3. AI 서비스 레이어

### 3.1 AIService (`src/lib/internal/ai-service.ts`)
- AI와의 상호작용을 관리하는 핵심 서비스
- Mastra Agent와 MCP 클라이언트 설정
- 메모리 관리 및 도구셋 구성
- 스트림 응답 생성

### 3.2 StreamManager (`src/lib/internal/stream-manager.ts`)
- 스트림의 생명주기 관리
- Redis를 통한 스트림 상태 추적
- 재개 가능한 스트림 생성
- 중단/재시작 기능

## 4. AI Agent 및 도구

### 4.1 BuilderAgent (`src/mastra/agents/builder.ts`)
- Claude 3.5 Haiku 모델 사용
- PostgreSQL 기반 메모리 시스템
- Todo 도구와 연동

### 4.2 MorphTool (`src/tools/morph-tool.ts`)
- 실제 코드 편집을 수행하는 핵심 도구
- OpenAI API를 통해 Morph 모델 호출
- 파일 읽기 → 편집 → 쓰기 과정 수행
- Freestyle 개발 서버의 파일시스템과 연동

## 5. 코드 생성 및 실행

### 5.1 Freestyle 통합
- 개발 서버 요청 및 파일시스템 접근
- MCP 프로토콜을 통한 도구 연동
- 실시간 코드 편집 및 실행 환경

### 5.2 메모리 시스템
- PostgreSQL + PgVector를 사용한 대화 기록 저장
- 컨텍스트 유지를 통한 연속적인 대화 지원
- 스레드 기반 대화 관리

## 6. 전체 데이터 플로우

### 6.1 앱 생성 플로우
```
사용자 입력 ("Build a landing page...")
    ↓
템플릿 선택 (AI 키워드 감지)
    ↓
Git Clone (https://github.com/zachhere/yourai)
    ↓
Freestyle 개발 서버 생성
    ↓
데이터베이스 저장 (앱 정보)
    ↓
메모리 스레드 생성
    ↓
초기 AI 메시지 전송
    ↓
앱 페이지로 리다이렉트 (/app/{id})
```

### 6.2 채팅 기반 코딩 플로우
```
사용자 입력 (텍스트/이미지)
    ↓
Chat 컴포넌트
    ↓
API 라우트 (/api/chat)
    ↓
StreamManager (스트림 상태 관리)
    ↓
AIService (AI 상호작용)
    ↓
BuilderAgent (Claude 3.5 Haiku)
    ↓
MorphTool (코드 편집)
    ↓
Freestyle 파일시스템 (실제 파일 수정)
    ↓
실시간 코드 생성 및 실행
```

## 7. 핵심 특징

### 7.1 실시간 스트리밍
- Server-Sent Events를 통한 실시간 응답
- 재개 가능한 스트림으로 중단/재시작 지원
- Redis를 통한 상태 관리

### 7.2 멀티모달 지원
- 텍스트와 이미지 동시 입력
- 이미지 압축 및 최적화
- 다양한 미디어 타입 지원

### 7.3 메모리 기반 대화
- PostgreSQL 기반 대화 기록 저장
- 벡터 검색을 통한 컨텍스트 유지
- 스레드 기반 대화 관리

### 7.4 코드 편집 도구
- Morph API를 통한 지능형 코드 편집
- Freestyle 개발 서버와의 실시간 연동
- 파일시스템 직접 조작

이 시스템은 사용자의 자연어 입력을 받아서 실제 실행 가능한 코드를 생성하고, 실시간으로 편집하며, 지속적인 대화를 통해 개발을 진행할 수 있는 완전한 AI 기반 개발 환경을 제공합니다.
