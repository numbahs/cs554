const shell = require('shelljs');
const lab = process.argv.slice(-1)[0];

if (shell.ls().indexOf(`${lab}`) !== -1) {
  shell.cd(`./${lab}`);
  shell.exec(
    `zip -r Tang_Albert_CS554_${lab}.zip . -x "*node_modules/" -x "node_modules/**" -x "*.DS_Store" -x "*.zip" -x ".vscode/*"`
  );
} else {
  console.log(`${lab} folder must already exist!`);
}
