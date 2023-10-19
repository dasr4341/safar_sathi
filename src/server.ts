import express from 'express';
import http from 'http';
import { connection } from './config/connection.js';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import routes from './routes/index.js';

// READ // ---
// controller <-> service <-> db model
connection();

const app = express();

app.use(cors({
    credentials: true,
}));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

app.use('/api', routes());


app.listen(8080, () => {
    console.log('Server running at 8080');
})


