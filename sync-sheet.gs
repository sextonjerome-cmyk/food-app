/* Frigo — the sync end, living in your own Google Sheet.

   This is not part of the app. Nothing here runs on your phone, and the app
   folder never needs to know your address. You set it up once.

   HOW TO SET IT UP
   ----------------
   1.  Go to sheets.new and make a blank Sheet. Call it "Frigo sync".
   2.  Extensions  >  Apps Script.  Delete whatever is in the editor.
   3.  Paste this whole file in.  Save (the disk icon).
   4.  Deploy  >  New deployment.
       Gear icon  >  Web app.
       Execute as:      Me
       Who has access:  Anyone
       Deploy.
   5.  Google will ask you to allow it. It is your own script touching your own
       Sheet, so approve it. On the "Google hasn't verified this app" screen,
       click Advanced, then "Go to Frigo sync (unsafe)". That warning is what
       every unpublished personal script gets.
   6.  Copy the Web app URL it gives you. It looks like
       https://script.google.com/macros/s/AKfy..../exec
   7.  Paste that into Frigo  >  Settings  >  Sync address, on every device.
   8.  Tap Sync now on the phone that has the most in it, first.

   A second tab called "Scans" makes itself the first time you scan a barcode.
   One row per jar, with the product name exactly as the database gave it, the
   brand, the size, the shelf it went to and how many times you have scanned it.
   Nothing in it is ever renamed. You can sort and filter it like any Sheet —
   just do not rename or reorder the FIRST tab, which holds the kitchen.

   "Who has access: Anyone" is required — your phone is not signed in to Google
   inside the app. It means anyone HOLDING THE ADDRESS can read your kitchen, so
   treat the address like a password. It is a long random string; nobody finds
   it by guessing. Your Claude API key is never sent here.

   If you ever change this script, you must Deploy > Manage deployments > edit >
   New version, or the old code keeps running.                                */

/* A Sheets cell tops out around 50,000 characters, and a kitchen with a lot of
   your own recipes in it will pass that one day. So the blob goes down column A
   in pieces. The leading bar keeps a piece that happens to begin with "=" from
   being read as a formula. */
const CHUNK = 40000;
const MARK  = '|';

/* Normally blank. This script is meant to live INSIDE the Sheet — you get there
   with Extensions > Apps Script, and it finds the Sheet on its own.

   If you made the script some other way (script.new, or the Apps Script home
   page), it is not attached to anything and every call fails with a confusing
   null error. In that case only: open your Sheet, copy the long code out of its
   address bar — the part between /d/ and /edit — and paste it between the
   quotes below. */
const SHEET_ID = '';

function book_() {
  return SHEET_ID
    ? SpreadsheetApp.openById(SHEET_ID)
    : SpreadsheetApp.getActiveSpreadsheet();
}

function sheet_() {
  return book_().getSheets()[0];
}

function doGet() {
  const sh = sheet_();
  const rows = sh.getLastRow()
    ? sh.getRange(1, 1, sh.getLastRow(), 1).getValues()
    : [];
  const text = rows
    .map(function (r) { return String(r[0] || '').replace(/^\|/, ''); })
    .join('');
  return ContentService.createTextOutput(text)
    .setMimeType(ContentService.MimeType.JSON);
}

/* ------------------------------------------------------------ the scan log

   A second tab, written one row per barcode. The app forgets the digits, so
   this is where a scanned jar is remembered.

   Nothing here is ever renamed. "Label" is the product exactly as the database
   gave it; "Saved as" is the plain shelf word Frigo ticked. Both are kept, side
   by side, and only the count and the last-seen date are ever rewritten. */
const LOG_TAB  = 'Scans';
const LOG_HEAD = ['Label', 'Barcode', 'Product', 'Brand', 'Size',
                  'Saved as', 'Shelf', 'Category', 'Times', 'Last scanned'];

function logSheet_() {
  const ss = book_();
  let sh = ss.getSheetByName(LOG_TAB);
  if (!sh) {
    /* At the END, so the kitchen blob stays sheet number one. */
    sh = ss.insertSheet(LOG_TAB, ss.getNumSheets());
    sh.appendRow(LOG_HEAD);
    sh.setFrozenRows(1);
    sh.getRange('B:B').setNumberFormat('@');   // 0123... must keep its zero
  }
  return sh;
}

function logScan_(row) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const sh = logSheet_();
    const code = String(row.code || '');
    const last = sh.getLastRow();

    /* Same jar again: bump the count and the date, leave every name alone. */
    if (code && last > 1) {
      const codes = sh.getRange(2, 2, last - 1, 1).getValues();
      for (let i = 0; i < codes.length; i++) {
        if (String(codes[i][0]) === code) {
          const r = i + 2;
          const n = Number(sh.getRange(r, 9).getValue()) || 1;
          sh.getRange(r, 9).setValue(n + 1);
          sh.getRange(r, 10).setValue(row.at || '');
          return ContentService.createTextOutput('seen again');
        }
      }
    }

    sh.appendRow([row.label || '', code, row.product || '', row.brand || '',
                  row.size || '', row.saved || '', row.shelf || '',
                  row.section || '', 1, row.at || '']);
  } finally {
    lock.releaseLock();
  }
  return ContentService.createTextOutput('logged');
}

function doPost(e) {
  const body = (e && e.postData && e.postData.contents) || '';
  const parsed = JSON.parse(body);

  if (parsed && parsed.log) return logScan_(parsed.log);

  /* Refuse anything that isn't a whole kitchen. A half-sent body would
     otherwise overwrite a good one with rubbish. */
  if (!parsed || !parsed.inventory) {
    return ContentService.createTextOutput('not a kitchen');
  }

  /* Two phones tapping Sync at the same moment would interleave their writes
     and leave a torn blob behind. */
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const parts = [];
    for (let i = 0; i < body.length; i += CHUNK) {
      parts.push([MARK + body.substr(i, CHUNK)]);
    }
    const sh = sheet_();
    sh.clear();
    if (parts.length) sh.getRange(1, 1, parts.length, 1).setValues(parts);
  } finally {
    lock.releaseLock();
  }
  return ContentService.createTextOutput('ok');
}
