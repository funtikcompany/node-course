import { createServer } from 'node:http';
import { readFileSync, existsSync, writeFileSync } from 'fs';

// Читаємо налаштування з settings.json
function readSettings() {
    try {
        const settingsContent = readFileSync('settings.json', 'utf-8');
        return JSON.parse(settingsContent);
    } catch (err) {
        return {
            historyRoute: '/history',
            historyFileName: 'history.json'
        };
    }
}

// Читаємо JSON файл з історією відвідувань
function readHistoryJson(filePath) {
    try {
        const content = readFileSync(filePath, 'utf-8').trim();
        if (!content) return {}; 
        return JSON.parse(content);
    } catch (err) {
        return {}; 
    }
}

// Записуємо JSON файл з історією відвідувань
function writeHistoryJson(filePath, data) {
    return writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// Зберігаємо статистику відвідувань роуту
function saveRouteToHistory(historyFileName, route) {
    const data = readHistoryJson(historyFileName);
    if (route in data) {
        data[route]++;
    } else {
        data[route] = 1;
    }
    writeHistoryJson(historyFileName, data);
}

const settings = readSettings();
const historyRoute = settings.historyRoute || '/history';
const historyFileName = settings.historyFileName || 'history.json';

const server = createServer((req, res) => {
    const url = req.url;
    
    // Перевіряємо чи це роут для перегляду історії
    if (url === historyRoute) {
        const historyData = readHistoryJson(historyFileName);
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify(historyData, null, 2));
        return;
    }
    
    let htmlFile = '';
    
    if (url === '/' || url === '/index') {
        htmlFile = 'index.html';
    } else if (url === '/coffee') {
        htmlFile = 'coffee.html';
    } else if (url === '/music') {
        htmlFile = 'music.html';
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Сторінка не знайдена\n');
        return;
    }
    
    // Перевіряємо чи існує файл та читаємо його
    if (existsSync(htmlFile)) {
        saveRouteToHistory(historyFileName, url);
        
        const htmlContent = readFileSync(htmlFile, 'utf-8');
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(htmlContent);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(`Файл ${htmlFile} не знайдено\n`);
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Сервер запущено на http://localhost:${PORT}`);
});

