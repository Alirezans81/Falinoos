const getUserByEmail = "SELECT * FROM users WHERE email = $1";
const addUser =
  "INSERT INTO users (email, password, name, gender, age) VALUES ($1, $2, $3, $4, $5)";
const updatePassword = "UPDATE users SET password = $1 WHERE email = $2";
const updateName = "UPDATE users SET name = $1 WHERE email = $2";
const updateGender = "UPDATE users SET gender = $1 WHERE email = $2";
const updateAge = "UPDATE users SET age = $1 WHERE email = $2";
const getUserById = "SELECT * FROM users WHERE id = $1";
const reserve =
  "INSERT INTO reservations (userid, username, disease, date, phone, status) VALUES ($1, $2, $3, $4, $5, $6)";
const getReservationsByUserId = "SELECT * FROM users WHERE userId = $1";

module.exports = {
  getUserByEmail,
  addUser,
  updatePassword,
  updateName,
  updateGender,
  updateAge,
  getUserById,
  reserve,
  getReservationsByUserId,
};
