Version 0.9: For this implementation of the storage of persistent information, I used sqlite3: small, fast, reliable. This iteration will store the DB on the local machine in file format.

Database Design Schema:

### Tables

#### User
PK  UserID - INTEGER PRIMARY KEY NOT NULL
    Username - TEXT NOT NULL
    Email - TEXT  NOT NULL
    SignupDate - DATE NOT NULL
    PasswordSalt - BINARY NOT NULL
    PasswordHash - BINARY NOT NULL

#### Journal
PK  JournalID - INTEGER PRIMARY KEY NOT NULL
FK  UserID - INTEGER NOT NULL REFERENCES User (UserID)
    ChildName - TEXT
    ChildBDay - DATE
/   ChildAgeInDays - INTEGER

#### Entry
PK  EntryID - INTEGER PRIMARY KEY NOT NULL
FK  JournalID - INTEGER NOT NULL REFERENCES Journal (JournalID)
    DateLastSave - DATETIME
    DateExplicit - DATE
    Text - TEXT

#### TagSchedule
PK  TagID - INTEGER PRIMARY KEY NOT NULL
FK  JournalID - INTEGER NOT NULL REFERENCES Journal (JournalID)
    FrequencyDesired - ?Text?Int?function?
/   FrequencyAchieved - ?Text?Int?function?

#### EntryTag
PK  EntryTagID - INTEGER PRIMARY KEY NOT NULL
FK  EntryID - INTEGER NOT NULL REFERENCES Entry (EntryID)
FK  TagID - INTEGER NOT NULL REFERENCES Tag (TagID)
    ManuallyAssigned - BOOLEAN DEFAULT 0
