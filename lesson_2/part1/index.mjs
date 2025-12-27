import readline from 'node:readline';
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// rl.question('Enter your name: ', (name) => {
//   console.log(`Hello ${name}`);
//   rl.close();
// });

rl.setPrompt('Enter your name: ');
rl.prompt();
rl.on('line', (input) => {
    console.log(`Hello ${input}`);
});

rl.on('SIGINT', () => {
    rl.question('Are you sure you want to exit? (y/n): ', (answer) => {
        if(answer.toLowerCase() === 'y') {
            rl.close();
        } else {
            rl.setPrompt('Enter your name: ');
            rl.prompt();
        }
    });
});