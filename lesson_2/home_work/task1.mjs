import readline from 'node:readline';

const args = process.argv.slice(2);
const allArgs = args.join('&');
const paramsMap = new URLSearchParams(allArgs);

if(paramsMap.has('--pension')) {
    const pension = paramsMap.get('--pension');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
    rl.question('Enter your age: ', (age) => {
        if(age >= pension) {
            console.log('Вам нараховано пенсію');
        } else {
            console.log('Ви ще достатньо молодий . Ідіть працюйте!');
        }
        rl.close();
    });
}
