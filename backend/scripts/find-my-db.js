const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const potentialPaths = [
    path.resolve(__dirname, '../freelance.db'),
    path.resolve(__dirname, '../../frontend/freelance.db'),
    path.resolve(__dirname, '../dist/freelance.db'),
    path.join(process.cwd(), 'freelance.db')
];

const uniquePaths = [...new Set(potentialPaths)];
const results = [];

let processed = 0;

uniquePaths.forEach(dbPath => {
    if (fs.existsSync(dbPath)) {
        const size = fs.statSync(dbPath).size;
        const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY, (err) => {
            if (err) {
                results.push({ path: dbPath, status: 'ERROR', error: err.message });
                checkDone();
                return;
            }
            db.all('SELECT id, email, role FROM user', [], (err, rows) => {
                if (err) {
                    results.push({ path: dbPath, status: 'ERROR', error: err.message });
                } else {
                    results.push({
                        path: dbPath,
                        status: 'FOUND',
                        size,
                        users: rows
                    });
                }
                db.close();
                checkDone();
            });
        });
    } else {
        results.push({ path: dbPath, status: 'NOT_FOUND' });
        checkDone();
    }
});

function checkDone() {
    processed++;
    if (processed === uniquePaths.length) {
        console.log(JSON.stringify(results, null, 2));
    }
}
