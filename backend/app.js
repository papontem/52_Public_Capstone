"use strict";

/** Express app for jobly. */

const express = require("express");
const cors = require("cors");

const { NotFoundError } = require("./expressError");

const { authenticateJWT } = require("./middleware/auth");
const authRoutes = require("./routes/auth");
const pagesRoutes = require("./routes/pages");
const usersRoutes = require("./routes/users");
const factsRoutes = require("./routes/facts");
// const companiesRoutes = require("./routes/companies");
// const usersRoutes = require("./routes/users");
// const jobsRoutes = require("./routes/jobs");

const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(express.json());

/** These are different morgan middlware logs to console that we can use for keeping track of what our apps current state is.
 * Chose 1 from:
 * 		- tiny
 * 		- dev
 * 		- giant one i made fo fun
 */
// app.use(morgan("tiny"));
app.use(morgan("dev"));
// app.use(
// 	morgan(
// 		"---- \n Method: :method \n URL: :url \n Status: :status \n http-version: :http-version \n :date  \n User Agent: :user-agent \n Request Auth: :req[authorization] \n Response Auth: :res[authorization] \n Content Length: :res[content-length] \n Response Time: :response-time ms "
// 	)
// );

app.use(authenticateJWT);
// console.log("OI!!");
app.use("/auth", authRoutes);
app.use("/pages", pagesRoutes);
app.use("/users", usersRoutes);
app.use("/facts", factsRoutes);
// app.use("/companies", companiesRoutes);
// app.use("/users", usersRoutes);
// app.use("/jobs", jobsRoutes);

/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
	return next(new NotFoundError());
});

/** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
	if (process.env.NODE_ENV !== "test") console.error(err.stack);
	const status = err.status || 500;
	const message = err.message;

	return res.status(status).json({
		error: { message, status },
	});
});

module.exports = app;
