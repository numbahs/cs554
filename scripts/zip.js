const shell = require('shelljs');
const lab = process.argv.slice(-1)[0]

if(shell.ls().indexOf(`Assignment${lab}`) !== -1) {
    shell.cd(`./Assignment${lab}`)
    shell.exec(`zip -r Tang_Albert_CS546_WS.zip . -x "*node_modules/" -x "node_modules/**" -x "*.DS_Store" -x "*.zip"`)
} else {
    console.log(`Assignment${lab} folder must already exist!`);
}
