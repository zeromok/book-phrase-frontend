# O:GU (오구, 오늘의 구절) — Frontend

> **문구로 책을 발견하는 서비스**의 프론트엔드
>
> 책 제목과 저자 없이, 감성 문구만 보고 책을 발견합니다.

🌐 **서비스 주소**: [www.todayogu.com](https://www.todayogu.com)  
🔗 **백엔드 레포**: [zeromok/book-phrase](https://github.com/zeromok/book-phrase)

---

## 기술 스택

| 영역 | 기술 |
|------|------|
| Framework | React 19 |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| HTTP | Axios |
| 피드백 | Tally (팝업 폼) |
| 배포 | Vercel |

---

## 주요 기능

- **태그 필터**: `위로받고싶다` / `자극받고싶다` / `쉬고싶다` / `성장하고싶다` 4개 감성 태그로 피드 필터링
- **문구 카드 피드**: 태그에 맞는 문구를 카드 형태로 표시
- **Reveal**: 카드 탭 시 책 제목 / 저자 / 출판사 공개
- **피드백 버튼**: 우측 하단 플로팅 버튼 → Tally 팝업 폼 오픈

---

## 환경 변수

`.env.local` 파일을 생성하고 아래 값을 설정하세요.

```env
VITE_API_BASE_URL=https://your-backend-url
```

> 실제 백엔드 URL은 팀 내부에서 공유합니다.

---

## 로컬 실행

```bash
npm install
npm run dev
```

> 로컬에서는 백엔드가 `http://localhost:8080`에서 실행 중이어야 합니다.  
> `.env.local`의 `VITE_API_BASE_URL`을 `http://localhost:8080`으로 변경하세요.

---

## 프로젝트 구조

```
src/
├── api/
│   └── phraseApi.js      # 태그/피드/reveal API 호출
├── components/
│   └── PhraseCard.jsx    # 문구 카드 컴포넌트
├── pages/
│   └── FeedPage.jsx      # 메인 피드 페이지 (태그 필터 + 카드 목록 + 피드백 버튼)
├── App.jsx
└── main.jsx
```
