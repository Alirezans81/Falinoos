const bcrypt = require("bcrypt");

module.exports = (req, res, next) => {
  req.user.isadmin
    ? next()
    : res.status(403).json({
        data: null,
        message: `شما اجازه ورود ندارید`,
      });
};
