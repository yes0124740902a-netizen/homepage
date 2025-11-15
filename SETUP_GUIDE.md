# 구글 시트 연동 설정 가이드 📋

구글 시트 ID: `1zpeZSK0H7OdWwa8GKtgOz00j4Y6x2nDpvyNTjrL9QGs`

## 📌 설정 순서

### 1단계: 구글 시트 준비

1. 구글 시트 열기
   - URL: `https://docs.google.com/spreadsheets/d/1zpeZSK0H7OdWwa8GKtgOz00j4Y6x2nDpvyNTjrL9QGs/edit`

2. 시트가 비어있다면 첫 번째 행(헤더)은 자동으로 생성됩니다
   - Apps Script가 실행되면 자동으로 다음 헤더가 생성됩니다:
   - `신청일시 | 이름 | 이메일 | 연락처 | 희망과정 | 문의사항 | IP주소 | 상태`

---

### 2단계: Google Apps Script 설정

1. **구글 시트에서 Apps Script 열기**
   ```
   확장 프로그램 → Apps Script
   ```

2. **코드 붙여넣기**
   - 기본 `Code.gs` 파일의 모든 내용을 삭제
   - `google-apps-script.js` 파일의 전체 코드를 복사하여 붙여넣기

3. **코드 수정 (선택사항)**

   **이메일 발송 기능 활성화** (원하시는 경우):

   `google-apps-script.js` 파일에서 `doPost` 함수 내부에 다음 줄 추가:
   ```javascript
   // 자동 이메일 발송 (선택사항)
   sendConfirmationEmail(data);  // ← 이 줄의 주석 제거
   sendAdminNotification(data);  // ← 관리자 알림도 원하면 추가
   ```

   **관리자 이메일 주소 변경**:
   ```javascript
   function sendAdminNotification(data) {
     const adminEmail = 'web-master@example.com'; // ← 실제 이메일로 변경
     ...
   }
   ```

4. **프로젝트 이름 변경** (선택사항)
   - 왼쪽 상단 "제목 없는 프로젝트" 클릭
   - "웹제작 마스터 클래스 - 신청 폼"으로 변경

---

### 3단계: 웹 앱으로 배포

1. **배포 시작**
   ```
   오른쪽 상단 [배포] 버튼 → [새 배포]
   ```

2. **배포 유형 선택**
   - 톱니바퀴 아이콘 ⚙️ 클릭
   - "웹 앱" 선택

3. **배포 설정**
   ```
   설명: 랜딩페이지 신청 폼 v1.0
   실행 사용자: 나
   액세스 권한: 모든 사용자
   ```

4. **승인 및 배포**
   - [배포] 버튼 클릭
   - "액세스 승인" 클릭
   - 구글 계정 선택 → 고급 → "안전하지 않은 페이지로 이동" 클릭
   - "허용" 클릭

5. **웹 앱 URL 복사**
   - 배포가 완료되면 표시되는 **웹 앱 URL**을 복사
   - 예시: `https://script.google.com/macros/s/AKfycby.../exec`

---

### 4단계: 랜딩페이지에 URL 연결

1. **landing-page.html 파일 열기**

2. **968번째 줄 수정**
   ```javascript
   // 변경 전
   const SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';

   // 변경 후 (3단계에서 복사한 URL 붙여넣기)
   const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby.../exec';
   ```

3. **파일 저장**

---

### 5단계: 테스트

1. **브라우저로 landing-page.html 열기**

2. **테스트 데이터 입력**
   ```
   이름: 테스트
   이메일: test@example.com
   연락처: 010-1111-2222
   희망 과정: 기본 과정 (₩297,000)
   문의사항: 테스트 신청입니다
   ```

3. **신청 완료하기 버튼 클릭**

4. **구글 시트 확인**
   - 새로운 행이 추가되었는지 확인
   - 모든 데이터가 올바르게 입력되었는지 확인

5. **이메일 확인** (이메일 발송 활성화한 경우)
   - 신청자 이메일에 확인 메일 도착 확인
   - 관리자 이메일에 알림 메일 도착 확인

---

## 🔧 문제 해결 (Troubleshooting)

### 문제 1: "전송 중 오류가 발생했습니다" 메시지 표시

**원인**: Apps Script URL이 올바르지 않거나 배포가 완료되지 않음

**해결방법**:
1. Apps Script 배포 상태 확인
2. 웹 앱 URL 정확히 복사했는지 확인
3. `landing-page.html`의 `SCRIPT_URL` 값이 올바른지 확인

### 문제 2: 데이터가 시트에 기록되지 않음

**원인**: Apps Script 권한 문제 또는 코드 오류

**해결방법**:
1. Apps Script 에디터에서 실행 로그 확인
   ```
   보기 → 실행 로그 (Ctrl+Enter)
   ```
2. `testFormSubmission()` 함수 실행해서 테스트
3. 시트 ID가 올바른지 확인

### 문제 3: 이메일이 발송되지 않음

**원인**: Gmail 발송 한도 초과 또는 함수 호출 누락

**해결방법**:
1. `doPost` 함수에서 `sendConfirmationEmail(data)` 주석 해제했는지 확인
2. Gmail 일일 발송 한도 확인 (무료: 100통/일)
3. 스팸 폴더 확인

### 문제 4: CORS 에러

**원인**: 브라우저 보안 정책

**해결방법**:
- 현재 코드는 `mode: 'no-cors'`로 설정되어 있어 문제없음
- 다른 방법: Apps Script 배포 시 "모든 사용자" 권한 확인

---

## 📊 데이터 관리 팁

### 1. 자동 정렬
구글 시트에서 데이터 → 범위 정렬 → 신청일시 기준 내림차순

### 2. 조건부 서식
상태 열에 색상 표시:
- "신규" → 빨강
- "연락 완료" → 노랑
- "등록 완료" → 초록

### 3. 필터 추가
데이터 → 필터 만들기 → 희망 과정별로 필터링

### 4. 월별 시트 분리
새로운 달이 시작되면:
1. 시트 하단 "+" 버튼으로 새 시트 추가
2. 기존 시트 이름을 "2025년 1월" 등으로 변경
3. Apps Script는 항상 활성 시트에 기록됨

---

## 🚀 고급 기능 (선택사항)

### A. 자동 응답 이메일 커스터마이징

`sendConfirmationEmail` 함수에서 HTML 템플릿 수정:
```javascript
const htmlBody = `
  <div style="...">
    <!-- 여기서 이메일 디자인 수정 -->
  </div>
`;
```

### B. Slack/Discord 알림 연동

`doPost` 함수에 Webhook 추가:
```javascript
function sendSlackNotification(data) {
  const webhookUrl = 'YOUR_SLACK_WEBHOOK_URL';
  const payload = {
    text: `신규 신청: ${data.name}님 (${data.course})`
  };

  UrlFetchApp.fetch(webhookUrl, {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(payload)
  });
}
```

### C. 자동 번호 부여

시트에 "신청번호" 열 추가 후:
```javascript
const lastRow = sheet.getLastRow();
const applicationNumber = 'APP-' + String(lastRow).padStart(5, '0');
```

---

## 📞 지원

문제가 지속되면 다음 정보와 함께 문의:
1. 오류 메시지 스크린샷
2. Apps Script 실행 로그
3. 브라우저 콘솔 로그 (F12 → Console)

---

## ✅ 완료 체크리스트

- [ ] 구글 시트 열기 완료
- [ ] Apps Script 코드 붙여넣기 완료
- [ ] 웹 앱으로 배포 완료
- [ ] 웹 앱 URL 복사 완료
- [ ] landing-page.html에 URL 입력 완료
- [ ] 테스트 신청 성공
- [ ] 시트에 데이터 기록 확인
- [ ] (선택) 이메일 발송 확인

---

**축하합니다! 이제 랜딩페이지가 완전히 작동합니다! 🎉**