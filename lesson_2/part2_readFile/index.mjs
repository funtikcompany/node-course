import {createServer} from 'node:http';
// import {readFile} from 'fs/promises';
// import {writeFile} from 'fs/promises'; 
import {readFileSync, writeFileSync} from 'fs';
import fs from 'fs';
// async function readFileAsync() {
//     const data = await readFile('info.html', 'utf-8');
//     console.log(data);
// }

// readFileAsync();

// const server = createServer(async(req, res) => {
//     const filePath = req.url.slice(1)
//     const myFiles = ['info.html', 'product.html'];

//     if(myFiles.includes(filePath)) {
//         const data = await readFile(filePath, 'utf-8');
//         res.writeHead(200, { 'Content-Type': 'text/html' });
//         res.end(data);
//     } else {
//         res.writeHead(404, { 'Content-Type': 'text/plain' });
//         res.end('File not found\n');
//     }
// });
// const server = createServer((req, res) => {
//     const filePathName = req.url.slice(1)
//     const filePath = `${filePathName}.html`;

//     if(fs.existsSync(filePath)) {
//         const data =  readFileSync(filePath, 'utf-8');
//         res.writeHead(200, { 'Content-Type': 'text/html' });
//         res.end(data);
//     } else {
//         res.writeHead(404, { 'Content-Type': 'text/plain' });
//         res.end('File not found\n');
//     }
// });
// const filePathForHistory = 'history.txt';
// const server = createServer(async (req, res) => {
//     const filePathName = req.url.slice(1)
//     const filePath = `${filePathName}.html`;
//     if(filePathName === 'history') {
//         const data =  readFileSync(filePathForHistory, 'utf-8');
//         res.writeHead(200, { 'Content-Type': 'text/plain' });
//         res.end(data);
//         return;
//     }
//     if(fs.existsSync(filePath)) {
//          (filePathForHistory, `${filePath}\n`, { flag: 'a' });
//         const data =  readFileSync(filePath, 'utf-8');
//         res.writeHead(200, { 'Content-Type': 'text/html' });
//         res.end(data);
//     } else {
//         res.writeHead(404, { 'Content-Type': 'text/plain' });
//         res.end('File not found\n');
//     }
// });
// server.listen(3000, () => {
//     console.log('Server is running on http://localhost:3000');
// });

// ================================

const filePathForHistory = 'history.json';
function readJson(filePath)  {
    try {
        const content = readFileSync(filePath, 'utf-8').trim();
        if (!content) return {}; // якщо файл порожній
        return JSON.parse(content);
    } catch (err) {
        return {}; // якщо файл не існує або JSON битий
    }
}

function writeJson(filePath, data) {
    return writeFileSync(filePath, JSON.stringify(data, null, 2));
}
function savePathToHistory(filePath, itemFilePath) {
    const data = readJson(filePath);
    if(itemFilePath in data) data[itemFilePath]++
    else data[itemFilePath] = 1;
    writeJson(filePath, data);
}
const server = createServer(async (req, res) => {
    const filePathName = req.url.slice(1)
    const filePath = `${filePathName}.html`;
    if(filePathName === 'history') {
        const data =  readFileSync(filePathForHistory, 'utf-8');
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(data);
        return;
    }
    
    if(fs.existsSync(filePath)) {
        savePathToHistory(filePathForHistory, filePath);
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(readFileSync(filePath, 'utf-8'));
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('File not found\n');
    }
});
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
