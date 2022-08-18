const { Router } = require("express");
const controller = require("./controller");
const isAdmin = require("../middlewares/isAdmin");
const isLoggined = require("../middlewares/isLoggined");

const router = Router();

//user funcs
router.post("/signup", controller.signup);

router.post("/signin", controller.signin);

router.use("/update", isLoggined);
router.put("/update", (req, res) => controller.updateUser(req, res));

router.use("/:id/reservations", isLoggined);
router.put("/:id/reservations", (req, res) => controller.getUserReservations(req, res));

router.use("/:id", isLoggined, isAdmin);
router.get("/:id", (req, res) => controller.getUser(req, res));

//reservation func
router.use("/reserve", isLoggined);
router.post("/reserve", (req, res) => controller.reserve(req, res));

module.exports = router;
