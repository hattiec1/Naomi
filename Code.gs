/**
 * Prayer Vigil for Naomi — sign-up storage
 * Paste this into Extensions > Apps Script in your Google Sheet, then Deploy as a Web app.
 * Sign-ups are saved to a tab called "Sign-ups". WhatsApp numbers stay in the sheet
 * and are never sent back to the web page.
 */
const SHEET_NAME = 'Sign-ups';

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    sh.appendRow(['Signed up at', 'Hour (1-24)', 'Name', 'City', 'WhatsApp', 'Leading?']);
    sh.setFrozenRows(1);
    sh.getRange('A1:F1').setFontWeight('bold');
  }
  return sh;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// Keeps text short and stops anything from being read as a spreadsheet formula.
function clean_(value, maxLength) {
  let s = String(value || '').trim().slice(0, maxLength);
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return s;
}

// The web page calls this to show who has signed up (no phone numbers).
function doGet() {
  const rows = getSheet_().getDataRange().getValues().slice(1);
  const signups = rows
    .filter(r => r[1] !== '' && r[2] !== '')
    .map(r => ({
      hour: Number(r[1]),
      name: String(r[2]).replace(/^'/, ''),
      city: String(r[3]).replace(/^'/, ''),
      leader: String(r[5]).toLowerCase() === 'yes'
    }));
  return json_({ ok: true, signups: signups });
}

// The web page calls this when someone signs up.
function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const d = JSON.parse(e.postData.contents || '{}');
    const hour = Number(d.hour);
    if (!(hour >= 1 && hour <= 24 && Math.floor(hour) === hour)) {
      return json_({ ok: false, error: 'Please choose an hour from the list.' });
    }
    const name = clean_(d.name, 60);
    if (!name) return json_({ ok: false, error: 'Please enter your name.' });
    getSheet_().appendRow([
      new Date(), hour, name, clean_(d.city, 60), clean_(d.whatsapp, 30), d.leader ? 'Yes' : 'No'
    ]);
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: 'Sign-up didn\'t go through. Please try again.' });
  } finally {
    lock.releaseLock();
  }
}
