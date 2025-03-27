import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
// Load environment variables
dotenv.config();
const sequelize = new Sequelize(process.env.DB_NAME, // 'kanban_db'
process.env.DB_USER, // 'postgres'
process.env.DB_PASSWORD, // 'password'
{
    host: '127.0.0.1', // Adjust if your database runs elsewhere
    dialect: 'postgres',
});
export default sequelize;
//# sourceMappingURL=database.js.map