const getReservations = "SELECT * FROM reservations";
const getReservationsById = "SELECT * FROM reservations WHERE userId = $1";

module.exports = {
  getReservations,
  getReservationsById,
};
