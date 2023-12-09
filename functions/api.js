require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const serverless = require('serverless-http')

// Routes
const ledgerRoutes = require('../src/routes/ledger-customer.routes');
const ledgerTransactionRoutes = require('../src/routes/ledger-transaction.routes');
const accountRoutes = require('../src/routes/account.routes');
const transactionRoutes = require('../src/routes/transaction.routes');
const cardRoutes = require('../src/routes/card.routes');
const docRoutes = require('../src/routes/doc.routes');

const corsOptions = {
  origin: 'http://127.0.0.1:5173', // Replace with your React app's origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

const mongoString = 'mongodb+srv://masum:12345@cluster0.l2w7sfy.mongodb.net/';

mongoose.connect(mongoString, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Error connecting to MongoDB:', error));
const database = mongoose.connection;

database.on('error', (error) => {
  console.log(error)
})

database.once('connected', () => {
  console.log('Database Connected');
})
const app = express();

app.use(express.json());
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

// Enable CORS for all routes
app.use(cors(corsOptions));
// app.use('/api/ledger-customer', ledgerRoutes);
// app.use('/api/ledger-transaction', ledgerTransactionRoutes);
app.use('/account', accountRoutes);
// app.use('/api/transaction', transactionRoutes);
// app.use('/api/card', cardRoutes);
// app.use('/api/doc', docRoutes);

app.listen(3000, () => {
  console.log(`Server Started at ${3000}`)
})


module.exports.handler = serverless(app)

// "start": "nodemon index.js"