const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

// Root of the project (assuming script is in backend/scripts)
const projectRoot = path.resolve(__dirname, '../../');
console.log(`Aranıyor: ${projectRoot} içindeki tüm freelance.db dosyaları...`);

function findFiles(startPath, filter, callback) {
    if (!fs.existsSync(startPath)) {
        console.log("no dir ", startPath);
        return;
    }

    const files = fs.readdirSync(startPath);
    for (let i = 0; i < files.length; i++) {
        const filename = path.join(startPath, files[i]);
        const stat = fs.lstatSync(filename);
        if (stat.isDirectory()) {
            if (files[i] !== 'node_modules' && files[i] !== '.git') { // Skip heavy folders
                findFiles(filename, filter, callback);
            }
        } else if (filename.endsWith(filter)) {
            callback(filename);
        }
    }
}

findFiles(projectRoot, 'freelance.db', (dbPath) => {
    console.log(`\n-----------------------------------------------------------`);
    console.log(`[BULUNDU] ${dbPath}`);

    const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.log(`  HATA: Açılamadı - ${err.message}`);
            return;
        }

        db.all('SELECT * FROM user', [], (err, rows) => {
            if (err) {
                console.log(`  HATA: Okunamadı - ${err.message}`);
            } else {
                console.log(`  Kullanıcı Sayısı: ${rows.length}`);
                const elif = rows.find(r => r.email === 'elif.tuncay@gmail.com');
                if (elif) {
                    console.log(`  >>> HEDEF BULUNDU! <<<`);
                    console.log(`  ID: ${elif.id}, İsim: ${elif.fullName}, Rol: ${elif.role}`);

                    // Update automatically if found
                    const updateSql = `UPDATE user SET role = "ADMIN" WHERE email = "elif.tuncay@gmail.com"`;
                    db.run(updateSql, (err) => {
                        if (err) console.log("  Güncelleme hatası:", err);
                        else console.log("  >>> OTOMATİK OLARAK ADMIN YAPILDI! <<<");
                    });

                } else {
                    console.log(`  HEDEF YOK. İçerik:`);
                    rows.forEach(r => console.log(`   - ${r.email} (${r.role})`));
                }
            }
            // Close later to allow update to finish
            setTimeout(() => db.close(), 1000);
        });
    });
});
