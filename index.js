#!/usr/bin/env node
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
const camelCase = require('camelcase');
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
  },
  {
    name: 'quiet',
    alias: 'q',
    type: Boolean
  }

];
const options = commandLineArgs(optionDefinitions);

var buffer = '\'use strict\';\n\n';
buffer += 'const pug = require(\'pug-runtime\');\n\n';

for (let file of options.files) {
  let module = camelCase(path.basename(file, '.pug')).replace(/\W/g, '');
  let compiled = pug.compileFile(file);
  buffer += '\n' + 'module.exports[\'' + module + '\'] = ' + compiled + ';\n';
}

fs.writeFile(options.output, buffer, (err) => {
    if (err) throw err;
    if (!options.quiet) {
      console.log('File ' + options.output + ' has been saved!');
    }
});

