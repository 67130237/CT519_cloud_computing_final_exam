const express = require('express');
const multer = require('multer');
const mysql = require('mysql2/promise');
const path = require('path');
const app = express();

const port = 3000;

// Static files
app.use('/static', express.static(path.join(__dirname, 'html/static')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// File upload setup
const upload = multer({ dest: 'html/static/uploads/' });

// DB connection pool
let pool;
async function initDb() {
    try {
        pool = await mysql.createPool({
            host: 'db',
            user: 'user',
            password: 'password',
            database: 'finalexam',
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });
        console.log("✅ Connected to DB");
    } catch (err) {
        console.error("❌ Could not connect to DB:", err.message);
        setTimeout(initDb, 3000); // Retry every 3 sec
    }
}
initDb();

// Routes: Static HTML
app.get('/', (req, res) => res.sendFile(__dirname + '/html/index.html'));
app.get('/about', (req, res) => res.sendFile(__dirname + '/html/about.html'));
app.get('/myresearch', (req, res) => res.sendFile(__dirname + '/html/myresearch.html'));
app.get('/reference', (req, res) => res.sendFile(__dirname + '/html/reference.html'));
app.get('/ref_management', (req, res) => res.sendFile(__dirname + '/html/ref_management.html'));

app.get('/pdf/:filename', (req, res) => {
  const filePath = path.join(__dirname, 'html/static/uploads', req.params.filename);
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'inline; filename="' + req.params.filename + '"');
  res.sendFile(filePath);
});

// API: Get references
app.get('/api/references', async (req, res) => {
    try {
        if (!pool) throw new Error("DB not connected yet");
        const [rows] = await pool.query("SELECT * FROM `references`");
        res.json(rows);
    } catch (err) {
        console.error("❌ GET /api/references error:", err.message);
        res.status(500).json({ error: "Failed to fetch references" });
    }
});

// PUT: แก้ไขชื่อบทความ
app.put('/api/references/:id', async (req, res) => {
  try {
    if (!pool) throw new Error("DB not connected");
    const id = req.params.id;
    const { title } = req.body;
    await pool.query("UPDATE `references` SET title = ? WHERE id = ?", [title, id]);
    res.json({ success: true });
  } catch (err) {
    console.error("❌ PUT /api/references/:id error:", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
});

// API: Add reference
// app.post('/api/references', upload.single('pdf'), async (req, res) => {
//     try {
//         if (!pool) throw new Error("DB not connected yet");
//         const title = req.body.title;
//         const filename = req.file.filename + "pdf";
//         await pool.query("INSERT INTO `references` (title, pdf_path) VALUES (?, ?)", [title, filename]);
//         res.redirect('/reference');
//     } catch (err) {
//         console.error("❌ POST /api/references error:", err.message);
//         res.status(500).send("Error saving reference");
//     }
// });

app.post('/api/references', upload.single('pdf'), async (req, res) => {
  try {
    if (!pool) throw new Error("DB not connected yet");

    const title = req.body.title;
    if (!req.file) throw new Error("No file uploaded");

    const originalFilename = req.file.filename;

    const [rows] = await pool.query("SELECT MAX(id) AS maxId FROM `references`");
    const nextId = (rows[0].maxId || 0) + 1;

    const renamedFile = `ref${nextId}.pdf`;
    const fs = require('fs');
    const oldPath = `html/static/uploads/${originalFilename}`;
    const newPath = `html/static/uploads/${renamedFile}`;

    // 👇 เช็กว่ามีไฟล์อยู่จริงก่อน rename
    if (!fs.existsSync(oldPath)) {
      throw new Error("Uploaded file not found");
    }

    fs.renameSync(oldPath, newPath);

    await pool.query("INSERT INTO `references` (title, pdf_path) VALUES (?, ?)", [title, renamedFile]);
    res.redirect('/reference');
  } catch (err) {
    console.error("❌ POST /api/references error:", err.message);
    res.status(500).send("Error saving reference: " + err.message);
  }
});

// API: Delete reference
app.post('/api/references/delete/:id', async (req, res) => {
    try {
        if (!pool) throw new Error("DB not connected yet");
        const id = req.params.id;
        await pool.query("DELETE FROM `references` WHERE id = ?", [id]);
        res.redirect('/reference');
    } catch (err) {
        console.error("❌ DELETE /api/references/:id error:", err.message);
        res.status(500).send("Error deleting reference");
    }
});

// Start server
app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
});
