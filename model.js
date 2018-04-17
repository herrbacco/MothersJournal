var model = {

  addTag : function (entry, tag) {
    console.log('tagging '+ entry + ' with tag: ' + tag);
  },
  removeTag : function(entry, tag) {
    console.log('untagging ' + entry + ' with tag: ' + tag);
  }
}

module.exports = model;
