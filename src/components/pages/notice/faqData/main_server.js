import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const corsOptions = {
    origin: 'http://localhost:5173', // 요청을 허용할 출처
    credentials: true, // 인증 정보를 포함한 요청을 허용
};

app.use(cors(corsOptions));
app.use(express.json());

const db = mysql.createConnection({
    host: 'gihoon.info',
    user: 'bandifesta',
    password: "qkselvptmxk1!@A",
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
    db.query('SELECT * FROM faq', (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

app.listen(3012, () => {
    console.log('Server running on port 3012');
});