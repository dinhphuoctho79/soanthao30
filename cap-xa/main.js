const { app, BrowserWindow, ipcMain, dialog, Menu } = require('electron');
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
    title: 'Soạn thảo văn bản NĐ30 - Cấp xã',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false
    }
  });
  win.loadFile(path.join(__dirname, 'app', 'nd30-cap-xa.html'));
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

app.whenReady().then(createWindow);
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
