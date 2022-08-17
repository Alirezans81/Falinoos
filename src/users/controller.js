const pool = require("../../db");
const queries = require("./queries");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const hash = async (text) => {
  salt = parseInt(process.env.BCRYPT_SALT);
  const hash = await bcrypt.hash(text, salt);

  return hash;
};

const signup = async (req, res) => {
  //check if the user is already signed up
  let alreadySignedUp = false;
  pool.query(queries.getUserByEmail, [req.body.email], (err, results) => {
    try {
      if (err) throw err;
      if (results.rows.length) {
        alreadySignedUp = true;
        res.status(409).json({
          data: null,
          message: "این ایمیل قبلا استفاده شده است",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        data: null,
        message: error.message,
      });
    }
  });

  //signing up the user
  if (!alreadySignedUp) {
    const { email, password, name, gender, age } = req.body;

    //crypting password
    try {
      const passHashed = await hash(password);

      // adding user to the db
      pool.query(
        queries.addUser,
        [email, passHashed, name, gender, age],
        (err, results) => {
          if (err) throw err;
          res.status(201).json({
            data: { email, name, gender, age },
            message: "شما با موفقیت ثبت نام شدید",
          });
        }
      );
    } catch (error) {
      res.status(500).json({
        data: null,
        message: error.message,
      });
    }
  }
};

const signin = (req, res) => {
  pool.query(queries.getUserByEmail, [req.body.email], (err, results) => {
    try {
      if (err) throw err;
      if (!results.rows.length) {
        //check if the user is already signed up
        res.status(401).json({
          data: null,
          message: "ایمیل یا پسورد نادرست است",
        });
      } else {
        //check if the password is correct
        const { email, password, name } = results.rows[0];
        bcrypt.compare(req.body.password, password, function (err, result) {
          if (err) throw err;
          if (result) {
            TOKEN_SECRET = process.env.TOKEN_SECRET;
            const token = jwt.sign({ data: email }, TOKEN_SECRET, {
              expiresIn: "1h",
            });
            res.status(200).json({
              data: { email, name, token },
              message: "شما با موفقیت وارد شدید",
            });
          } else {
            res.status(401).json({
              data: null,
              message: "ایمیل یا پسورد نادرست است",
            });
          }
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        data: null,
        message: error.message,
      });
    }
  });
};

const updateUser = async (req, res) => {
  //update
  const { password, name, gender, age } = req.body;

  //chack if anything is changed
  let changed = false;

  //crypting password
  try {
    const passHashed = await hash(password);
    if (password && passHashed !== req.user.password) {
      pool.query(
        queries.updatePassword,
        [passHashed, req.user.email],
        (err, result) => {
          if (err) throw err;
        }
      );
      req.user.password = passHashed;
      changed = true;
    }
  } catch (error) {
    res.status(500).json({
      data: null,
      message: error.message,
    });
  }

  //updating other properties
  //-name
  if (name && name !== req.user.name) {
    pool.query(queries.updateName, [name, req.user.email], (err, result) => {
      try {
        if (err) throw err;
      } catch (error) {
        res.status(500).json({
          data: null,
          message: error.message,
        });
      }
    });
    req.user.name = name;
    changed = true;
  }

  //-gender
  if (gender && gender !== req.user.gender) {
    pool.query(
      queries.updateGender,
      [gender, req.user.email],
      (err, result) => {
        try {
          if (err) throw err;
        } catch (error) {
          res.status(500).json({
            data: null,
            message: error.message,
          });
        }
      }
    );
    req.user.gender = gender;
    changed = true;
  }

  //-age
  if (age && age !== req.user.age) {
    pool.query(queries.updateAge, [age, req.user.email], (err, result) => {
      try {
        if (err) throw err;
      } catch (error) {
        res.status(500).json({
          data: null,
          message: error.message,
        });
      }
    });
    req.user.age = age;
    changed = true;
  }

  //response
  const newEmail = req.user.email;
  const newName = req.user.name;
  changed
    ? res.status(200).json({
        data: { newEmail, newName },
        message: "اطلاعات شما با موفقیت آپدیت شد",
      })
    : res.status(200).json({
        data: null,
        message: "چیزی تغییر نکرد",
      });
};

const getUser = (req, res) => {
  pool.query(queries.getUserById, [req.params.id], (err, results) => {
    try {
      if (err) throw err;
      const user = results.rows[0];
      user
        ? res.status(200).json({
            data: user,
            message: "کاربر یافت شد",
          })
        : res.status(404).json({
            data: null,
            message: "کاربر یافت نشد",
          });
    } catch (error) {
      res.status(500).json({
        data: null,
        message: error.message,
      });
    }
  });
};

const reserve = (req, res) => {
  const userId = body.user.id;
  const userName = body.user.name;
  const { disease, date, phoneNumber } = req.body;

  if (disease && data && phoneNumber) {
    //adding the reservation to the database
    pool.query(
      queries.resreve,
      [userId, disease, date, phoneNumber],
      (err, results) => {
        try {
          if (err) throw err;
          res.status(201).json({
            data: { userName, disease, date, phoneNumber },
            message: "درخواست شما با موفقیت ثبت شد",
          });
        } catch (error) {
          res.status(500).json({
            data: null,
            message: error.message,
          });
        }
      }
    );
  } else {
    res.status(400).json({
      data: null,
      message: "اطلاعات وارد شده کامل نیست",
    });
  }
};

module.exports = {
  signup,
  signin,
  updateUser,
  getUser,
  reserve,
};
