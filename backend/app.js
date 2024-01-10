"use strict";

/** Express app for onthisday_TIL. */

// IMPORTS START
const express = require("express");
const cors = require("cors");

const { NotFoundError } = require("./expressError");
// JWT
const { authenticateJWT } = require("./middleware/auth");
// ROUTES
// const authRoutes = require("./routes/auth");

const morgan = require("morgan");
// IMPORTS END

const app = express();

app.use(cors());
app.use(express.json());
// app.use(morgan("tiny"));
// app.use(morgan("dev"));
app.use(
	morgan(
		"---- \n Method: :method \n URL: :url \n Status: :status \n http-version: :http-version \n :date  \n User Agent: :user-agent \n Request Auth: :req[authorization] \n Response Auth: :res[authorization] \n Content Length: :res[content-length] \n Response Time: :response-time ms "
	)
);
// JWT
app.use(authenticateJWT);

// ROUTES
// app.use("/auth", authRoutes);



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
