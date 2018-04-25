// Version 0.9: For this implementation of the storage of persistent information, I used sqlite3: small, fast, reliable. This iteration will store the DB on the local machine in file format.
//
// Database Design Schema:
//
// ### Tables
//
// #### User
// PK  UserID - INTEGER PRIMARY KEY
//     Username - TEXT
//     Email - TEXT?
//     SignupDate - DATE
//     PasswordSalt - BINARY
//     PasswordHash - BINARY
//
// #### Journal
// PK  JournalID - INTEGER PRIMARY KEY
// FK  UserID - INTEGER
//     ChildName - TEXT
//     ChildBDay - DATE
// /   ChildAgeInDays - INTEGER
//
// #### Entry
// PK  EntryID - INTEGER PRIMARY KEY
// FK  JournalID - INTEGER
//     DateLastSave - DATETIME
//     DateExplicit - DATE
//     text - TEXT
//
// #### TagSchedule
// PK  TagID - INTEGER PRIMARY KEY
// FK  JournalID - INTEGER
//     FrequencyDesired - ?Text?Int?function?
// /   FrequencyAchieved - ?Text?Int?function?
//
// #### EntryTag
// PK  EntryTagID - INTEGER PRIMARY KEY
// FK  EntryID - INTEGER
// FK  TagID - INTEGER
//     ManuallyAssigned - BOOLEAN


var storage;
var dbfile = './simpleDB';
//var dbfile = ':memory:';
var sqlite3 = require('sqlite3').verbose();
var db;
var sql = '';

storage = {

  init : function (){
    db = new sqlite3.Database(dbfile, function(err){
      if (err){
        return console.error(err.message);
      }
      console.log('Connected to '+ dbfile +' and opened DB with no issues.');
    });

    db.serialize( function () {

      //Create user table if never done before for this dbfile
      sql += 'CREATE TABLE IF NOT EXISTS User ( ';
      sql += 'UserID INTEGER PRIMARY KEY NOT NULL, ';
      sql += 'Username TEXT NOT NULL, ';
      sql += 'Email TEXT NOT NULL, ';
      sql += 'SignupDate DATE NOT NULL, ';
      sql += 'PasswordSalt BINARY NOT NULL, ';
      sql += 'PasswordHash BINARY NOT NULL ) ';
      db.run(sql);

      sql = '';
      sql += 'CREATE TABLE IF NOT EXISTS Journal ( ';
      sql += 'JournalID  INTEGER PRIMARY KEY NOT NULL, ';
      sql += 'UserID INTEGER NOT NULL, ';
      sql += 'ChildName TEXT, ';
      sql += 'ChildBDay DATE )';
      db.run(sql);

      sql = '';
      sql += 'CREATE TABLE IF NOT EXISTS Entry ( ';
      sql += 'EntryID INTEGER PRIMARY KEY NOT NULL, ';
      sql += 'JournalID INTEGER NOT NULL, ';
      sql += 'DateLastSave DATETIME, ';
      sql += 'DateExplicit DATE, ';
      sql += 'Text TEXT )';
      db.run(sql);

      sql = '';
      sql += 'CREATE TABLE IF NOT EXISTS TagSchedule ( ';
      sql += 'TagID INTEGER PRIMARY KEY NOT NULL, ';
      sql += 'JournalID INTEGER NOT NULL, ';
      sql += 'FrequencyDesired TEXT, ';
      sql += 'FrequencyAchieved TEXT )';
      db.run(sql);

      sql = '';
      sql += 'CREATE TABLE IF NOT EXISTS EntryTag ( ';
      sql += 'EntryTagID INTEGER PRIMARY KEY NOT NULL, ';
      sql += 'EntryID INTEGER NOT NULL, ';
      sql += 'TagID INTEGER NOT NULL, ';
      sql += 'ManuallyAssigned BOOLEAN DEFAULT 0 )';
      db.run(sql);

    });

    db.all('PRAGMA table_info(user)', function(err, row) {
        for(let x = 0; x < row.length; x++){
//          console.log('x: '+ x);
//          console.log('row[x]: ' + row[x]);
          for (let y in row[x]){
            console.log(y + ' ' + row[x][y]);
          }
        }
    });

  },

  createInsertSelectClose : function () {
    db.serialize(function() {
      db.run("CREATE TABLE lorem (info TEXT)", [] , function (err) {
        if (err){
          console.log(err);
        }
      });

      var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
      for (var i = 0; i < 10; i++) {
          stmt.run("Ipsum " + i);
      }
      stmt.finalize();

      db.each("SELECT rowid AS id, info AS info FROM lorem", function(err, row) {
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
