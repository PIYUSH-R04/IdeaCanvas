import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as dotenv from 'dotenv';
import * as schema from '../../../migrations/schema';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
dotenv.config({ path: '.env' });

if (!process.env.DATABASE_URL) {
    console.log('🔴 No database url');
}

const client = postgres(process.env.DATABASE_URL as string, { max: 1 });
const db = drizzle(client, { schema });
// const migrateDb = async () => {
//     try {
//         console.log('🟠 Migrating client');
//         await migrate(db, { migrationsFolder: 'migrations' });
//         console.log('🟢 Successfully Migrated')
//     } catch (error) {
//         console.log('🔴 Error Migrating Client', error);
//     }
// };
// migrateDb();
export default db;




// Summary
// Imports: The code imports necessary modules and functions for handling database connections, schema definitions, environment variables, and migrations.
// Environment Variables: It loads environment variables from a .env file.
// Database URL Check: It checks if the DATABASE_URL environment variable is set and logs a message if it's missing.
// PostgreSQL Client: It creates a PostgreSQL client with a single connection.
// Drizzle ORM: It initializes a Drizzle ORM connection using the PostgreSQL client and the schema definitions.
// Migration: It defines and runs an asynchronous function to handle database migrations, logging the process and handling errors.
// Export: It exports the Drizzle ORM database connection for use in the application.
// This setup ensures your database is properly connected and migrated when your application starts, maintaining schema consistency and allowing for easy schema changes.