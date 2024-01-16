const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

/** return signed JWT from user data. */

function createToken(user) {
  console.assert(user.isAdmin !== undefined,
      "createToken passed user without isAdmin property");

  console.log("HELPERS TOKEN", user);
  let payload = {
    username: user.username,
    isAdmin: user.isAdmin || false,
  };
  
  console.log("HELPERS TOKEN PAYLOAD", payload);
  
  return jwt.sign(payload, SECRET_KEY);
}

module.exports = { createToken };
