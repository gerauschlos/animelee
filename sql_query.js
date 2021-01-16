const sqlite3 = require('better-sqlite3')('data/enmap.sqlite');
let rows = sqlite3.prepare('SELECT * FROM `battles`').all(); 

for (row of rows) {
    let value = JSON.parse(row.value);

    if (!value.vault) {
        console.log(row)
    }
}
