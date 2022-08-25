const getReservations = "SELECT * FROM reservations;";
const getReservationsById = "SELECT * FROM reservations WHERE userId = $1;";
const setReservationStatus =
  "UPDATE reservations SET status = $1 WHERE id = $2;";

module.exports = {
  getReservations,
  getReservationsById,
  setReservationStatus,
};
