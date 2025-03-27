import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import routes from './routes/index.js';
import { sequelize } from './models/index.js';
import cors from 'cors';
const app = express();
const PORT = process.env.PORT || 3001;
console.log("JWT_SECRET_KEY:", process.env.JWT_SECRET_KEY);
// Enable CORS for local development
app.use(cors({
    origin: 'http://localhost:3000', // Your frontend's URL
    methods: 'GET,POST',
    allowedHeaders: 'Content-Type,Authorization'
}));
// Serves static files in the entire client's dist folder only in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('../client/dist'));
}
app.use(express.json());
app.use(routes);
sequelize.sync({ force: process.env.NODE_ENV === 'development' })
    .then(() => {
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
});
