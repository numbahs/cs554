const shell = require('shelljs');
const lab = process.argv.slice(-1)[0]

const package = {
  "name": `cs-554-${lab}`,
  "version": "1.0.0",
  "description": `CS-554 ${lab} Submission for Albert Tang`,
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
if (shell.ls().indexOf(`${lab}`) !== -1) {
  console.log(`${lab} folder already exists!`)
} else {
  shell.mkdir(`${lab}`)
  shell.cd(`${lab}`)
  shell.echo(JSON.stringify(package, null, '\t')).to('package.json')
  shell.echo(heading).to(`app.js`)
  shell.echo(`# CS-554 ${lab} \n### Albert Tang`).to(`README.md`)
}