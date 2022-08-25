const { Router } = require("express");
const controller = require("./controller");
const isLoggined = require("../middlewares/isLoggined");
const isAdmin = require("../middlewares/isAdmin");

const router = Router();

router.use("/user/:id", isLoggined);
router.get("/user/:id", (req, res) => controller.getReservationsById(req, res));

router.use("/status", isLoggined, isAdmin);
router.put("/status", (req, res) => controller.setReservationStatus(req, res));

router.use("/", isLoggined, isAdmin);
router.get("/", (req, res) => controller.getReservations(req, res));

module.exports = router;
