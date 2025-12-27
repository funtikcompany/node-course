import { createServer } from 'node:http';
const actionWithNumbers = (typeAction,numbers=[]) => {
    let sum = null
    if(typeAction === 'add') {
        sum = numbers.reduce((acc, curr) => acc + curr, 0);
    }
    if(typeAction === 'mult') {
        sum = numbers.reduce((acc, curr) => acc * curr, 1);
    }
    if(typeAction === 'subtract') {
        sum = numbers.reduce((acc, curr) => acc - curr, 0);
    }
    return sum;
}
const server = createServer((req, res) => {
    const url = req.url;
    const allQuery = url.split('/')
    const [action, numbers] = allQuery.slice(1)
    const numbersArray = numbers ? numbers.split('-').map(Number) : [];
    const result = actionWithNumbers(action.trim(), numbersArray) ? `Результат:${actionWithNumbers(action, numbersArray)}` : 'Вкажіть дію і числа';
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(`${result}\n`);
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Сервер запущено на http://localhost:${PORT}`);
});

