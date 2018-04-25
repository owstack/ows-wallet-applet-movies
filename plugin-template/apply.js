#!/usr/bin/env node

'use strict';

var fs = require('fs-extra');
var path = require('path');

function copyDir(from, to) {
  console.log('Copying dir ' + from + ' to ' + to);

  if (!fs.existsSync(from)) {
    return;
  }
  if (fs.existsSync(to)) {
    fs.removeSync(to);
  }

  fs.copySync(from, to);
}

var templates = {
  'package-template.json': '/',
  'plugin-template.json': '/',
  'index-template.html': 'plugin/'
};

var releaseScripts = {
  releaseLibIonic: '<script type="application/javascript" src="/lib/ionic.bundle.min.js"></script>',
  releaseLibAngularComponents: '<script type="application/javascript" src="/lib/angular-components.js"></script>'
};

var configDir = process.argv[2];
if (!fs.existsSync(configDir)) {
  console.log('No distribution found for: ' + configDir + '. Use \'npm run set-dist <plugin-template>\' to set a distribution.');
  process.exit(1);
}

var JSONheader = ' { ' + "\n" + '  "//": "Changes to this file will be overwritten, modify it at plugin-template/ only.", ';
var configBlob = fs.readFileSync(configDir + '/config.json', 'utf8');
var config = JSON.parse(configBlob, 'utf8');

console.log('Applying ' + config.nameCase + ' template');

// Generate image resources from sketch
console.log('Creating resources for ' + config.nameCase);
var execSync = require('child_process').execSync;
execSync('sh ./generate.sh ' + configDir, { cwd: '../util/resources', stdio: [0,1,2] });
console.log('Done creating resources');

// Replace key-value strings in template files and add installable plugins to package.json
console.log('Configuring plugin...');
Object.keys(templates).forEach(function(f) {
  var targetDir = templates[f];

  console.log(' #    ' + f + ' => ' + targetDir);

  var content = fs.readFileSync(f, 'utf8');
  var releaseScriptKeys = [];
  f = f.replace('-template', '');

  if (f.indexOf('.json') > 0) {
    content = content.replace('{', JSONheader);
  }

  Object.keys(config).forEach(function(k) {
    if (k.indexOf('_') == 0) {
      return;
    }

    // Replace the key with a value.
    var r = new RegExp("\\*" + k.toUpperCase() + "\\*", "g");
    content = content.replace(r, config[k]);
  });

  // Create a release version of index.html (index.html.release)
  if (f === 'index.html') {
    var contentRelease = JSON.parse(JSON.stringify(content));

    Object.keys(releaseScripts).forEach(function(k) {
      var r = new RegExp("\\*" + k.toUpperCase() + "\\*", "g");
      contentRelease = contentRelease.replace(r, releaseScripts[k]);
      content = content.replace(r, '');
    });
  }

  // Look for any leftover variables.
  var r = new RegExp("\\*[A-Z]{3,30}\\*", "g");
  var s = content.match(r);
  if (s) {
    console.log('UNKNOWN VARIABLE', s);
    process.exit(1);
  }

  // Write the result.
  if (!fs.existsSync('../' + targetDir)) {
    fs.mkdirSync('../' + targetDir);
  }
  fs.writeFileSync('../' + targetDir + f, content, 'utf8');

  if (f === 'index.html') {
    fs.writeFileSync('../' + targetDir + f + '.release', contentRelease, 'utf8');
  }

});
console.log('Done configuring plugin');

// Create www directory
if (!fs.existsSync('../www')) {
  fs.mkdirSync('../www');
}

// Move assets
copyDir('../resources/' + configDir + '/img', '../plugin/assets/img');
copyDir(configDir + '/sass', '../plugin/shared/sass/overrides');

// Done
console.log("apply.js finished. \n\n");
