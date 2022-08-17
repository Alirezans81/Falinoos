const pool = require("../../db");
const { getUserByEmail } = require("./queries");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  //decoding recived json web token
  const token = req.headers["jwt-token"];
  TOKEN_SECRET = process.env.TOKEN_SECRET.toString();
  const email = jwt.verify(token, TOKEN_SECRET, (er, decoded) => {
    try {
      if (er) throw er;
      return decoded.data;
    } catch (error) {
      res.status(400).json({
        data: null,
        message: er.message,
      });
    }
  });

  //check the json web token
  if (email) {
    pool.query(getUserByEmail, [email], (err, results) => {
      try {
        if (err) throw err;
        if (results.rows.length) {
          req.user = results.rows[0];
          next();
        } else {
          res.status(400).json({
            data: null,
            message: 'ابتدا وارد شوید',
          });
        }
      } catch (error) {
        res.status(500).json({
          data: null,
          message: error.message,
        });
      }
    });
  }
};
