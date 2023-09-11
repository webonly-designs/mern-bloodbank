const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/db');


dotenv.config()

connectDB()

const app = express();

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))


app.use('/api/v1/test', require('./routes/testRoute'))
app.use('/api/v1/auth', require('./routes/authRoutes'))
app.use('/api/v1/inventory', require('./routes/inventoryRoutes'))

const PORT = process.env.PORT || 8080

app.listen(PORT, ()=> {
    console.log(`Node server running on port ${process.env.PORT}`.bgBlue.white)
});