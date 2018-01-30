const shell = require('shelljs');
const lab = process.argv.slice(-1)[0]

const package = {
  "name": `cs-554-assignment${lab}`,
  "version": "1.0.0",
  "description": `CS-554 assignment${lab} Submission for Albert Tang`,
  "main": "app.js",
  "scripts": {
    "start": "node app.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "Albert Tang",
  "license": "ISC"
}

const heading = `
/**
 * @file app.js
 * @author: Albert Tang
 * I pledge my honor that I abided by the Stevens Honor System.
 */
`
if(shell.ls().indexOf(`Assignment${lab}`) !== -1) {
     console.log(`Assignment${lab} folder already exists!`)
} else {
    shell.mkdir(`Assignment${lab}`)
    shell.cd(`Assignment${lab}`)
    shell.echo(JSON.stringify(package, null, '\t')).to('package.json')
    shell.echo(heading).to(`app.js`)
    shell.echo(`# CS-554 Assignment${lab} \n### Albert Tang`).to(`README.md`)
}