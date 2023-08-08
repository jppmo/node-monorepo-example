import express from 'express';
import initDb  from './db/dbConfig'
import router from './router';
import cors from 'cors';
import 'dotenv/config';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

app.use(cors());
app.use(express.json());

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});

initDb().catch(err => console.log(err));

app.use('/', router());