const { contextBridge, ipcRenderer } = require('electron');

// Cầu nối an toàn: renderer không được dùng Node trực tiếp.
// Mọi thao tác file bản nháp đều đi qua main.js, qua IPC.
contextBridge.exposeInMainWorld('nd30', {
  saveDraft: (draft) => ipcRenderer.invoke('nd30:save-draft', draft),
  listDrafts: () => ipcRenderer.invoke('nd30:list-drafts'),
  loadDraft: (id) => ipcRenderer.invoke('nd30:load-draft', id),
  deleteDraft: (id) => ipcRenderer.invoke('nd30:delete-draft', id),
  exportDraft: (draft) => ipcRenderer.invoke('nd30:export-draft', draft),
  importDraft: () => ipcRenderer.invoke('nd30:import-draft'),
  onNew: (cb) => ipcRenderer.on('nd30:new', cb),
  setGeminiKey: (key) => ipcRenderer.invoke('gemini:set-key', key),
  hasGeminiKey: () => ipcRenderer.invoke('gemini:has-key'),
  geminiAsk: (req) => ipcRenderer.invoke('gemini:ask', req)
});
