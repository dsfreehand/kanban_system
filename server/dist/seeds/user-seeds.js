import { User } from '../models/user.js';
import sequelize from '../config/database.js';
import bcrypt from 'bcryptjs';
export const seedUsers = async () => {
    console.log('Starting user-seeds.ts...');
    try {
        // Validate database connection
        console.log('Testing database connection...');
        await sequelize.authenticate();
        console.log('Database connection successful.');
        // Ensure users table is in sync with the model
        console.log('Syncing the users table...');
        await sequelize.sync({ alter: true });
        console.log('Users table synced successfully.');
        // Hash passwords for each user
        const hashedPasswords = await Promise.all([
            bcrypt.hash('password', 10),
            bcrypt.hash('password', 10),
            bcrypt.hash('password', 10),
        ]);
        console.log('Passwords hashed successfully.');
        // Bulk insert users with hashed passwords
        const users = await User.bulkCreate([
            { username: 'JollyGuru', password: hashedPasswords[0] },
            { username: 'SunnyScribe', password: hashedPasswords[1] },
            { username: 'RadiantComet', password: hashedPasswords[2] },
        ], { individualHooks: true } // Ensures hooks like `beforeCreate` are triggered
        );
        console.log('Users seeded successfully:', users);
    }
    catch (error) {
        console.error('Error seeding users:', error);
    }
};
// Automatically invoke the function when this script is run directly
(async () => {
    await seedUsers();
})();
//# sourceMappingURL=user-seeds.js.map