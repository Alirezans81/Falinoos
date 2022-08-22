const pool = require("../../db");
const queries = require("./queries");
const userQueries = require("../users/queries");
const shamsi = require("shamsi-date-converter");

const getReservations = (req, res) => {
  pool.query(queries.getReservations, [], (err, results) => {
    try {
      if (err) throw err;

      //modifying results
      const reservations = results.rows.map((reservation) => {
        //importing all users data
        pool.query(
          userQueries.getUserById,
          [reservation.userId],
          (er, resu) => {
            if (er) throw er;
            reservation.user = resu.rows[0];
          }
        );

        //returning reservations
        return reservation;
      });

      //response
      res.status(200).json({
        data: reservations,
        message: "ok",
      });
    } catch (error) {
      res.status(400).json({
        data: null,
        message: error.message,
      });
    }
  });
};

const getReservationsById = (req, res) => {
  pool.query(queries.getReservationsById, [req.params.id], (err, results) => {
    try {
      if (err) throw err;

      //modifying results
      const reservations = results.rows.map((reservation) => {
        //importing all users data
        pool.query(
          userQueries.getUserById,
          [reservation.userId],
          (er, resu) => {
            if (er) throw er;
            reservation.user = resu.rows[0];
          }
        );

        //returning reservations
        return reservation;
      });

      //response
      res.status(200).json({
        data: reservations,
        message: "ok",
      });
    } catch (error) {
      res.status(400).json({
        data: null,
        message: error.message,
      });
    }
  });
};

module.exports = {
  getReservations,
  getReservationsById,
};
