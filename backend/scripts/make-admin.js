const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Veritabanı dosyasının yolu
const dbPath = path.resolve(__dirname, '../freelance.db');

// E-posta adresini komut satırından al
const email = process.argv[2];

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Veritabanına bağlanılamadı:', err.message);
        return;
    }
    console.log('Veritabanına bağlanıldı.');
    // Force WAL checkpoint
    db.run('PRAGMA wal_checkpoint(FULL)', (err) => {
        if (err) console.error('Checkpoint hatası:', err.message);
    });
});

if (!email) {
    console.log('Kullanım: node scripts/make-admin.js <email_adresi>');
    console.log('\n--- Mevcut Kullanıcılar ---');
    db.all('SELECT id, email, role, fullName FROM user', [], (err, rows) => {
        if (err) console.error(err);
        else {
            if (rows.length === 0) console.log('HİÇ KULLANICI YOK.');
            rows.forEach(row => {
                console.log(`[${row.id}] ${row.email} (${row.fullName}) - Rol: ${row.role}`);
            });
        }
        db.close();
    });
    return;
}

const sql = `UPDATE user SET role = "ADMIN" WHERE email = ?`;

db.run(sql, [email], function (err) {
    if (err) {
        return console.error(err.message);
    }
    if (this.changes === 0) {
        console.log(`\nUYARI: "${email}" adresine sahip kullanıcı BULUNAMADI.`);
        console.log('Lütfen aşağıdaki listeden doğru e-postayı kontrol edin:');
        console.log('----------------------------------------------------');

        db.all('SELECT id, email, role, fullName FROM user', [], (err, rows) => {
            if (err) console.error(err);
            else {
                rows.forEach(row => {
                    console.log(`[${row.id}] ${row.email} (${row.fullName}) - Rol: ${row.role}`);
                });
            }
            db.close();
        });
    } else {
        console.log(`\nBAŞARILI! "${email}" kullanıcısı artık bir ADMIN.`);
        db.close();
    }
});
