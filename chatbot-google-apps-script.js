/**
 * Google Apps Script for Chatbot Conversation Logging
 * 구글 시트 ID: 1OeXwAHIu2GtYIOgJEMB-kOfWtZq_nsJZFuyoc-YHQPA
 *
 * 배포 방법:
 * 1. Google Sheets에서 확장 프로그램 > Apps Script 열기
 * 2. 이 코드를 복사해서 붙여넣기
 * 3. 배포 > 새 배포 > 유형: 웹 앱 선택
 * 4. 액세스 권한: "모든 사용자" 선택
 * 5. 배포 후 웹 앱 URL 복사
 */

function doPost(e) {
  try {
    // 요청 데이터 파싱
    const data = JSON.parse(e.postData.contents);

    // 구글 시트 ID
    const SHEET_ID = '1OeXwAHIu2GtYIOgJEMB-kOfWtZq_nsJZFuyoc-YHQPA';
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);

    // "챗봇 대화기록" 시트 가져오기 또는 생성
    let sheet = spreadsheet.getSheetByName('챗봇 대화기록');
    if (!sheet) {
      sheet = spreadsheet.insertSheet('챗봇 대화기록');
      // 헤더 추가
      sheet.appendRow([
        '타임스탬프',
        '세션 ID',
        '사용자 메시지',
        'AI 응답',
        '대화 순서',
        'IP 주소',
        '사용자 에이전트'
      ]);

      // 헤더 스타일링
      const headerRange = sheet.getRange(1, 1, 1, 7);
      headerRange.setBackground('#9333ea');
      headerRange.setFontColor('#ffffff');
      headerRange.setFontWeight('bold');
      headerRange.setHorizontalAlignment('center');
    }

    // 현재 시간 (한국 시간)
    const timestamp = Utilities.formatDate(
      new Date(),
      'Asia/Seoul',
      'yyyy-MM-dd HH:mm:ss'
    );

    // 데이터 추가
    sheet.appendRow([
      timestamp,
      data.sessionId || '익명',
      data.userMessage || '',
      data.aiResponse || '',
      data.messageIndex || 1,
      data.ipAddress || '',
      data.userAgent || ''
    ]);

    // 성공 응답
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'success',
        message: '대화 기록이 저장되었습니다.',
        timestamp: timestamp
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // 에러 응답
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// GET 요청 처리 (테스트용)
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: 'ok',
      message: '챗봇 대화 기록 API가 정상 작동 중입니다.',
      sheetId: '1OeXwAHIu2GtYIOgJEMB-kOfWtZq_nsJZFuyoc-YHQPA'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * 대화 통계 조회 함수 (선택사항)
 * 트리거 또는 수동 실행으로 통계 시트 업데이트
 */
function updateChatbotStatistics() {
  const SHEET_ID = '1OeXwAHIu2GtYIOgJEMB-kOfWtZq_nsJZFuyoc-YHQPA';
  const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
  const conversationSheet = spreadsheet.getSheetByName('챗봇 대화기록');

  if (!conversationSheet) {
    Logger.log('챗봇 대화기록 시트가 없습니다.');
    return;
  }

  // 통계 시트 생성 또는 가져오기
  let statsSheet = spreadsheet.getSheetByName('챗봇 통계');
  if (!statsSheet) {
    statsSheet = spreadsheet.insertSheet('챗봇 통계');
  } else {
    statsSheet.clear();
  }

  // 통계 헤더
  statsSheet.appendRow(['통계 항목', '값', '업데이트 시간']);
  const headerRange = statsSheet.getRange(1, 1, 1, 3);
  headerRange.setBackground('#9333ea');
  headerRange.setFontColor('#ffffff');
  headerRange.setFontWeight('bold');

  // 데이터 가져오기
  const data = conversationSheet.getDataRange().getValues();
  const totalConversations = data.length - 1; // 헤더 제외

  // 고유 세션 수
  const sessions = new Set();
  for (let i = 1; i < data.length; i++) {
    if (data[i][1]) sessions.add(data[i][1]);
  }

  const currentTime = Utilities.formatDate(
    new Date(),
    'Asia/Seoul',
    'yyyy-MM-dd HH:mm:ss'
  );

  // 통계 데이터 추가
  statsSheet.appendRow(['총 대화 수', totalConversations, currentTime]);
  statsSheet.appendRow(['고유 사용자 수', sessions.size, currentTime]);
  statsSheet.appendRow(['평균 대화당 메시지 수',
    sessions.size > 0 ? (totalConversations / sessions.size).toFixed(2) : 0,
    currentTime
  ]);

  // 오늘 날짜의 대화 수
  const today = Utilities.formatDate(new Date(), 'Asia/Seoul', 'yyyy-MM-dd');
  let todayCount = 0;
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] && data[i][0].toString().includes(today)) {
      todayCount++;
    }
  }
  statsSheet.appendRow(['오늘 대화 수', todayCount, currentTime]);

  Logger.log('통계 업데이트 완료');
}
