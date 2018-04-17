/*global require, module */

var storage = require('./storage.js');
var controller = {

  init : function () {
    storage.init();
    storage.createInsertSelectClose();
  }

}

module.exports = controller;
