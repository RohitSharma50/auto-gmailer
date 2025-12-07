require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173';

app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));
app.use(cors({ origin: CORS_ORIGIN, credentials: false }));

require('./src/db');

app.get('/health', (_req, res) => res.json({ ok: true }));

app.use('/api/auth', require('./src/routes/auth'));

app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));