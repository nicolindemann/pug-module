/*
 * index.js
 * Copyright 2017 Lucas Neves <lcneves@gmail.com>
 *
 * Entry-point for the pug-module project.
 * Compiles pug files into a module JS file that can be required.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const pug = require('pug');
const commandLineArgs = require('command-line-args');

const optionDefinitions = [
  {
    name: 'files',
    alias: 'f',
    type: String,
    multiple: true,
    defaultOption: true
  },
  {
    name: 'output',
    alias: 'o',
    type: String,
    multiple: false
  }
];
const options = commandLineArgs(optionDefinitions);

var buffer = '\'use strict\';\n\n';

for (let file of options.files) {
  let module = path.basename(file, '.pug');
  let compiled = pug.compileFile(file);
  buffer += '\n' + 'module.exports.' + module + ' = ' + compiled + ';\n';
}

fs.writeFile(options.output, buffer, (err) => {
    if (err) throw err;
    console.log('File ' + options.output + ' has been saved!');
});

