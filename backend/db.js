"use strict";
/** Database setup for onthisday_TIL. */
const { Client } = require("pg");
const {
	getDatabaseUri,
	PGPORT,
	PG_USERNAME,
	PG_PASSWORD,
	DB_NAME
} = require("./config");

let db;

if (process.env.NODE_ENV === "production") {
	db = new Client({
		connectionString: getDatabaseUri(),
		ssl: {
			rejectUnauthorized: false,
		},
	});
} else {
	// db = new Client({
	// 	connectionString: getDatabaseUri(),
	// });

  // PAM: create a manual connection while we are still in development
  db = new Client({
    host: "localhost",
    port: PGPORT,
    user: PG_USERNAME,
    password: PG_PASSWORD,
    database: DB_NAME,
  });

}

async function connectDB() {
    try {
        await db.connect();
        console.log("Connected to the database");
    } catch (error) {
        console.error("Error connecting to the database:", error.message);
    }
}

connectDB();

module.exports = db;
