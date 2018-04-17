
var storage;
//var dbfile = './simpleDB';
var dbfile = ':memory:';
var sqlite3 = require('sqlite3').verbose();
var db;

storage = {

  init : function (){
    db = new sqlite3.Database(dbfile, function(err){
      if (err){
        return console.error(err.message);
      }
      console.log('Connected to '+ dbfile +' and opened DB with no issues.');
    });
    //rest of the init fn()
  },

  createInsertSelectClose : function () {
    db.serialize(function() {
      db.run("CREATE TABLE lorem (info TEXT)");

      var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
      for (var i = 0; i < 10; i++) {
          stmt.run("Ipsum " + i);
      }
      stmt.finalize();

      db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
          console.log(row.id + ": " + row.info);
      });
    });

    db.close(function (err) {
      if (err){
        return console.error(err.message);
      }
      console.log('Closed '+ dbfile +' with no issues.');
    });
  }
}

module.exports = storage;
