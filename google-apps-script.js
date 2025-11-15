/**
 * 웹제작 마스터 클래스 - 신청 폼 데이터 수집용 Apps Script
 * 구글 시트 ID: 1zpeZSK0H7OdWwa8GKtgOz00j4Y6x2nDpvyNTjrL9QGs
 */

function doPost(e) {
  try {
    // 구글 시트 연결
    const sheet = SpreadsheetApp.openById('1zpeZSK0H7OdWwa8GKtgOz00j4Y6x2nDpvyNTjrL9QGs').getActiveSheet();

    // POST 데이터 파싱
    const data = JSON.parse(e.postData.contents);

    // 현재 시간
    const timestamp = new Date();

    // 시트에 데이터 추가 (헤더가 없으면 자동으로 추가)
    if (sheet.getLastRow() === 0) {
      // 헤더 행 추가
      sheet.appendRow([
        '신청일시',
        '이름',
        '이메일',
        '연락처',
        '희망과정',
        '문의사항',
        'IP주소',
        '상태'
      ]);

      // 헤더 스타일 지정
      const headerRange = sheet.getRange(1, 1, 1, 8);
      headerRange.setBackground('#667eea');
      headerRange.setFontColor('#ffffff');
      headerRange.setFontWeight('bold');
      headerRange.setHorizontalAlignment('center');
    }

    // 데이터 행 추가
    sheet.appendRow([
      timestamp,
      data.name || '',
      data.email || '',
      data.phone || '',
      data.course || '',
      data.message || '',
      data.ip || '',
      '신규'
    ]);

    // 자동 이메일 발송 (선택사항)
    sendConfirmationEmail(data);

    // 성공 응답
    return ContentService
      .createTextOutput(JSON.stringify({
        'status': 'success',
        'message': '신청이 완료되었습니다!'
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // 에러 로깅
    Logger.log('Error: ' + error.toString());

    // 에러 응답
    return ContentService
      .createTextOutput(JSON.stringify({
        'status': 'error',
        'message': '신청 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// GET 요청 처리 (테스트용)
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      'status': 'success',
      'message': 'Apps Script가 정상 작동중입니다.'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * 신청자에게 확인 이메일 발송
 */
function sendConfirmationEmail(data) {
  if (!data.email) return;

  try {
    const subject = '웹제작 마스터 클래스 신청이 완료되었습니다';

    const htmlBody = `
      <div style="font-family: 'Malgun Gothic', sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0;">웹제작 마스터 클래스</h1>
        </div>

        <div style="padding: 30px; background: #f8f9fa;">
          <h2 style="color: #2d3748;">안녕하세요, ${data.name}님!</h2>

          <p style="font-size: 16px; line-height: 1.6; color: #4a5568;">
            웹제작 마스터 클래스에 신청해주셔서 감사합니다.<br>
            귀하의 신청이 정상적으로 접수되었습니다.
          </p>

          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #667eea; margin-top: 0;">신청 정보</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">이름</td>
                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${data.name}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">이메일</td>
                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${data.email}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">연락처</td>
                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${data.phone}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">희망 과정</td>
                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${data.course}</td>
              </tr>
              ${data.message ? `
              <tr>
                <td style="padding: 10px; font-weight: bold;">문의사항</td>
                <td style="padding: 10px;">${data.message}</td>
              </tr>
              ` : ''}
            </table>
          </div>

          <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0;">
            <p style="margin: 0; color: #856404;">
              <strong>다음 단계</strong><br>
              담당자가 1~2 영업일 내에 연락드려 상세한 일정과 결제 방법을 안내해드립니다.
            </p>
          </div>

          <p style="font-size: 14px; color: #718096; margin-top: 30px;">
            문의사항이 있으시면 언제든지 답장해주세요.<br>
            감사합니다!
          </p>
        </div>

        <div style="background: #2d3748; padding: 20px; text-align: center; color: white; font-size: 12px;">
          <p style="margin: 5px 0;">웹제작 마스터 클래스</p>
          <p style="margin: 5px 0;">이메일: web-master@example.com | 전화: 010-1234-5678</p>
        </div>
      </div>
    `;

    MailApp.sendEmail({
      to: data.email,
      subject: subject,
      htmlBody: htmlBody
    });

    Logger.log('Confirmation email sent to: ' + data.email);

  } catch (error) {
    Logger.log('Email sending failed: ' + error.toString());
  }
}

/**
 * 관리자에게 신규 신청 알림 발송
 */
function sendAdminNotification(data) {
  const adminEmail = 'web-master@example.com'; // 관리자 이메일로 변경

  try {
    const subject = '[신규 신청] ' + data.name + '님이 ' + data.course + ' 과정에 신청하셨습니다';

    const body = `
신규 신청이 접수되었습니다.

이름: ${data.name}
이메일: ${data.email}
연락처: ${data.phone}
희망 과정: ${data.course}
문의사항: ${data.message || '없음'}

신청 시간: ${new Date().toLocaleString('ko-KR')}

구글 시트에서 확인하기:
https://docs.google.com/spreadsheets/d/1zpeZSK0H7OdWwa8GKtgOz00j4Y6x2nDpvyNTjrL9QGs/edit
    `;

    MailApp.sendEmail(adminEmail, subject, body);

    Logger.log('Admin notification sent');

  } catch (error) {
    Logger.log('Admin notification failed: ' + error.toString());
  }
}

/**
 * 테스트 함수 - 스크립트 에디터에서 직접 실행 가능
 */
function testFormSubmission() {
  const testData = {
    name: '홍길동',
    email: 'test@example.com',
    phone: '010-1111-2222',
    course: '프리미엄 과정',
    message: '주말 교육도 가능한가요?',
    ip: '127.0.0.1'
  };

  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };

  const result = doPost(mockEvent);
  Logger.log(result.getContent());
}
