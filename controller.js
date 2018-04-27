/*global require, module */
var model = require('./model.js');


var cli = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '>'
});

var controller = {

  init : function () {
    model.init();
    rootMenu();
//    model.createInsertSelectClose();
  }

};

function rootMenu() {
  console.log('What would you like to do?');

  cli.prompt();
  cli.on('line', function getRootMenuResponse(line) {
    console.log('--trigger for getRootMenuResponse listener--');
    switch (line.trim()) {
      case 'ce':
      case 'CE':
        console.log('create entry');
        createEntry();
        break;
      case 'q':
      case 'Q':
        console.log('quit');
        quit();
        break;
      default:
        console.log('try again');
        cli.prompt();
    }
  });
  cli.on('close', function quitRootMenu () {
    model.close();
    process.exit(0);
  });
};

function createEntry(){

  console.log('Journal Entry:');
  cli.removeAllListeners('line');
  console.log('remove all listeners before adding gatherEntry listener');
  cli.prompt();
  cli.once('line', function gatherEntry(entry) {
    console.log('--trigger for gatherEntry listener--');
    model.saveEntry(entry);
    rootMenu();
  });
};

function quit(){
  console.log('code to quit');
  cli.close();
};

module.exports = controller;
