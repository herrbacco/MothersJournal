var storage = require('./storage.js');

var model = {

  init : function () {
    storage.init();
  },
  addTag : function (entry, tag) {
    console.log('tagging '+ entry + ' with tag: ' + tag);
  },
  removeTag : function(entry, tag) {
    console.log('untagging ' + entry + ' with tag: ' + tag);
  },
  close : function () {
    storage.closeDB();
  },
  saveEntry : function(entry) {
    storage.saveEntry(entry);
  }
}

module.exports = model;
