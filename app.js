require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const routers = require('./routes/index');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const { limiter } = require('./middlewares/rateLimiter');

const { BD_ADDRESS, PORT } = require('./config');

const app = express();

mongoose.connect(BD_ADDRESS, {
  useNewUrlParser: true,
});

app.use(express.json());
app.use(requestLogger);

const allowedCors = [
  'https://movies-express.nomoredomains.work',
  'http://movies-express.nomoredomains.work',
  'http://localhost:3006',
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost',
];

const corsOptions = {
  origin: allowedCors,
  methods: 'GET, POST, PUT, DELETE',
  allowedHeaders: 'Accept, Content-Type, Authorization',
};

app.use(cors(corsOptions));
app.use(helmet());

app.use(limiter);
app.use(routers);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server start listening on port ${PORT}`);
});
