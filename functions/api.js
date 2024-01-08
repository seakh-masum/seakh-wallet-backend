require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const serverless = require('serverless-http')

// for wallet
const ledgerRoutes = require('../src/routes/ledger-customer.routes');
const ledgerTransactionRoutes = require('../src/routes/ledger-transaction.routes');
const accountRoutes = require('../src/routes/account.routes');
const transactionRoutes = require('../src/routes/transaction.routes');
const cardRoutes = require('../src/routes/card.routes');
const docRoutes = require('../src/routes/doc.routes');

// For resumes
const contactRoutes = require('../src/routes/contact.routes');
const experienceRoutes = require('../src/routes/experience.routes');
const educationRoutes = require('../src/routes/education.routes');
const hobbyRoutes = require('../src/routes/hobby.routes');
const profileRoutes = require('../src/routes/profile.routes');
const projectRoutes = require('../src/routes/project.routes');
const skillRoutes = require('../src/routes/skill.routes');

const allowedOrigins = ['http://localhost:5173', 'https://seakh-wallet.web.app'];

const corsOptions = {
  // origin: 'http://localhost:5173', // Replace with your React app's origin
  origin: function (origin, callback) {
    // Check if the origin is in the allowedOrigins array or if it's undefined (e.g., a same-origin request)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

const mongoString = "mongodb+srv://seakh_masum:62786@seakhcluster.wmf3vkd.mongodb.net/test";

mongoose.connect(mongoString).then(() => console.log('Connected to MongoDB'))
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
app.use('/ledger-customer', ledgerRoutes);
app.use('/ledger-transaction', ledgerTransactionRoutes);
app.use('/account', accountRoutes);
app.use('/transaction', transactionRoutes);
app.use('/card', cardRoutes);
app.use('/doc', docRoutes);

// for resumes
app.use('/contact', contactRoutes);
app.use('/education', educationRoutes);
app.use('/experience', experienceRoutes);
app.use('/hobby', hobbyRoutes);
app.use('/profile', profileRoutes);
app.use('/project', projectRoutes);
app.use('/skill', skillRoutes);

app.listen(3000, () => {
  console.log(`Server Started at ${3000}`)
})


module.exports.handler = serverless(app)