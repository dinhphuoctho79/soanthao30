const { app, BrowserWindow, ipcMain, dialog, Menu, safeStorage } = require('electron');
const path = require('path');
const fs = require('fs');

function draftsDir() {
  const dir = path.join(app.getPath('userData'), 'drafts');
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}
function safeName(id) {
  return String(id || 'draft').replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 80) || 'draft';
}

let win;
function createWindow() {
  win = new BrowserWindow({
    width: 1400,
    height: 900,
    title: 'Soạn thảo văn bản NĐ30 - Trạm Y tế Xã Hiệp Hưng',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false
    }
  });
  win.loadFile(path.join(__dirname, 'app', 'nd30-tram-y-te.html'));
  Menu.setApplicationMenu(Menu.buildFromTemplate([
    { label: 'Tệp', submenu: [
      { label: 'Soạn văn bản mới', accelerator: 'CmdOrCtrl+N', click: () => win.webContents.send('nd30:new') },
      { type: 'separator' },
      { role: 'quit', label: 'Thoát' }
    ]},
    { label: 'Trợ giúp', submenu: [
      { label: 'Về phần mềm', click: () => dialog.showMessageBox(win, {
        type: 'info', title: 'Về phần mềm',
        message: 'PHẦN MỀM SOẠN THẢO VĂN BẢN NĐ30 - CẤP XÃ\nTác giả: Nguyễn Công Dinh, Cần Thơ\nHỗ trợ kỹ thuật & Key: Zalo 0386435510\nDùng thử miễn phí 30 ngày.\nỨng dụng chạy offline, không gửi văn bản lên máy chủ.'
      })}
    ]}
  ]));
}

ipcMain.handle('nd30:save-draft', async (_e, draft) => {
  const file = path.join(draftsDir(), safeName(draft.id) + '.json');
  const payload = { ...draft, updatedAt: new Date().toISOString() };
  fs.writeFileSync(file, JSON.stringify(payload, null, 2), 'utf-8');
  return { ok: true, file };
});
ipcMain.handle('nd30:list-drafts', async () => {
  const dir = draftsDir();
  return fs.readdirSync(dir).filter(f => f.endsWith('.json')).map(f => {
    try { const d = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf-8')); return { id: d.id || f.replace(/\.json$/, ''), name: d.name || f, updatedAt: d.updatedAt || '' }; }
    catch { return { id: f, name: f, updatedAt: '' }; }
  });
});
ipcMain.handle('nd30:load-draft', async (_e, id) => {
  const file = path.join(draftsDir(), safeName(id) + '.json');
  if (!fs.existsSync(file)) return null;
  return JSON.parse(fs.readFileSync(file, 'utf-8'));
});
ipcMain.handle('nd30:delete-draft', async (_e, id) => {
  const file = path.join(draftsDir(), safeName(id) + '.json');
  if (fs.existsSync(file)) fs.unlinkSync(file);
  return { ok: true };
});
ipcMain.handle('nd30:export-draft', async (_e, draft) => {
  const res = await dialog.showSaveDialog(win, { defaultPath: 'ban-nhap-nd30.json', filters: [{ name: 'JSON', extensions: ['json'] }] });
  if (res.canceled || !res.filePath) return { ok: false };
  fs.writeFileSync(res.filePath, JSON.stringify(draft, null, 2), 'utf-8');
  return { ok: true, file: res.filePath };
});
ipcMain.handle('nd30:import-draft', async () => {
  const res = await dialog.showOpenDialog(win, { filters: [{ name: 'JSON', extensions: ['json'] }], properties: ['openFile'] });
  if (res.canceled || !res.filePaths.length) return null;
  return JSON.parse(fs.readFileSync(res.filePaths[0], 'utf-8'));
});


// --- Gemini: key chỉ lưu trên máy này, đã mã hóa bằng safeStorage ---
function geminiKeyPath() { return path.join(app.getPath('userData'), 'gemini-key.enc'); }
ipcMain.handle('gemini:set-key', async (_e, key) => {
  if (!key) { try { fs.unlinkSync(geminiKeyPath()); } catch {} return { ok: true, cleared: true }; }
  if (!safeStorage.isEncryptionAvailable()) return { ok: false, error: 'Máy này chưa bật mã hóa hệ thống, không lưu key.' };
  fs.writeFileSync(geminiKeyPath(), safeStorage.encryptString(String(key)));
  return { ok: true };
});
ipcMain.handle('gemini:has-key', async () => { return fs.existsSync(geminiKeyPath()); });
ipcMain.handle('gemini:ask', async (_e, req) => {
  try {
    if (!fs.existsSync(geminiKeyPath())) return { error: 'Chưa lưu API key Gemini trên máy này.' };
    if (!safeStorage.isEncryptionAvailable()) return { error: 'Máy này chưa bật mã hóa hệ thống.' };
    const key = safeStorage.decryptString(fs.readFileSync(geminiKeyPath()));
    const model = String((req && req.model) || 'gemini-2.5-flash').replace(/[^a-zA-Z0-9._-]/g, '');
    const prompt = String((req && req.prompt) || '').slice(0, 20000);
    if (!prompt.trim()) return { error: 'Chưa nhập nội dung cần phân tích.' };
    const res = await fetch('https://generativelanguage.googleapis.com/v1beta/models/' + model + ':generateContent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });
    const data = await res.json();
    if (!res.ok) return { error: (data && data.error && data.error.message) || ('Gemini trả về mã ' + res.status) };
    const text = data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts
      ? data.candidates[0].content.parts.map(x => x.text || '').join('') : '';
    return { text: text || 'Gemini không trả về nội dung.' };
  } catch (err) { return { error: String(err && err.message || err) }; }
});

app.whenReady().then(createWindow);
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
