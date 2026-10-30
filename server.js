require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT;
const cookieParser = require('cookie-parser');
const authRoutes = require('./src/routes/authRoutes');
const faqRoutes = require('./src/routes/faqRoutes');

const connectDB=require("./src/config/db");


app.use(express.json());
app.use(cookieParser());


app.use('/user', authRoutes);
app.use('/api/faq',faqRoutes);






console.log("first")

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running smoothly on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Failed to connect to Database, server not started.", err);
    });