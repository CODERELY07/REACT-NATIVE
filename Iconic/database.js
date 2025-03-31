import * as SQLite from 'expo-sqlite';

export const openDatabase = async () => {
  const db = await SQLite.openDatabaseAsync("iconicRecipes");
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY NOT NULL,
      username TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    );
  `);

  return db;
};

export const addUser = async (db, username, email, password) => {
  try {
    const result = await db.runAsync(
      `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`,
      username,
      email,
      password
    );
    return { success: true, lastInsertRowId: result.lastInsertRowId };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getUserByEmail = async (db, email) => {
  try {
    const result = await db.getFirstAsync(`SELECT * FROM users WHERE email = ?`, email);
    return result;
  } catch (error) {
    return null;
  }
};

// New function to get user by username
export const getUserByUsername = async (db, username) => {
  try {
    const user = await db.getFirstAsync("SELECT * FROM users WHERE username = ?", [username]);
    return user || null; // Return user if found, otherwise null
  } catch (error) {
    throw new Error("Error fetching user by username: " + error.message);
  }
};
