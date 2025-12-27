import { createServer } from 'node:http';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { readFileSync, unlinkSync,writeFileSync } from 'fs';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const numbersFilePath = join(__dirname, 'numbers.txt');

const server = createServer((req, res) => {
    const url = req.url;
    if (url.startsWith('/save_num/')) {
        const number = url.slice('/save_num/'.length);
        
        // Перевіряємо, чи це число
        if (number && !isNaN(number)) {
            writeFileSync(numbersFilePath, `${number}\n`, { flag: 'a' });
            
            res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end(`Число ${number} успішно збережено\n`);
        } else {
            res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('Помилка: невірний формат числа\n');
        }
    }if (url.startsWith('/sum')) {
        const data = readFileSync(numbersFilePath, 'utf-8');
        const numbers = data.split('\n').map(Number);
        const sum = numbers.reduce((acc, curr) => acc + curr, 0);
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(`Сума чисел: ${sum}\n`);
    }   
    if (url.startsWith('/mult')) {
        const data = readFileSync(numbersFilePath, 'utf-8');
        const numbers = data.split('\n').map(Number);
        const mult = numbers.reduce((acc, curr) => acc * curr, 1);
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(`Добуток чисел: ${mult}\n`);
    }   
    if (url.startsWith('/remove')) {
        unlinkSync(numbersFilePath);
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Файл numbers.txt успішно видалено\n');
    }   
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Роут не знайдено. Використовуйте /save_num/число\n');
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Сервер запущено на http://localhost:${PORT}`);
    console.log(`Використовуйте роут: http://localhost:${PORT}/save_num/число`);
});

