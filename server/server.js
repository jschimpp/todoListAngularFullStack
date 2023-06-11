const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { json } = require('body-parser');
const routes = require('./routes/api');

const app = express();
dotenv.config();
app.use(json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const PORT = process.env.PORT || 8080;

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected!!!');
  });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/tasks', routes);
app.listen(PORT, console.log(`Server is listening on port ${PORT}`));