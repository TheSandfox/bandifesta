import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'gihoon.info',
    user: 'leegihoon',
    password: "dlrlgns1~!A",
    database: 'bandifesta',
    port: 3306
});

db.connect(err => {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + db.threadId);
});

app.get('/data', (req, res) => {
    db.query('SELECT * FROM notice', (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

app.listen(3001, () => {
    console.log('Server running on port 3001');
});