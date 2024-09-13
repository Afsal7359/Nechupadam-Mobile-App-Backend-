const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Login = require('./routes/Login');
const Patient= require('./routes/Patients');


dotenv.config();

const port = process.env.PORT || 4025;

// CORS Configuration
const corsOptions = {
  origin: [
      'http://localhost:4111', // Add the port where your frontend is running
      'http://localhost:5173'  // Add this port if you're using it during development
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow other methods if needed
  optionsSuccessStatus: 204,
};

app.use(cors({ origin: '*' }));
 // Apply CORS middleware
app.use(morgan('dev'));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth',Login)
app.use('/api/patient',Patient)


mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.log(`Database connection error: ${error}`);
  });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
