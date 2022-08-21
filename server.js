const express = require("express");
const usersRoutes = require("./src/users/routes");
const reservationsRoutes = require("./src/reservations/routes");

const app = express();
const port = process.env.FALINOOS_PORT | 3000;

require("./config")(app, express);

app.get("/", (req, res) => {
  res.json({
    data: null,
    message: "node app is working...",
  });
});

app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/reservations", reservationsRoutes);

app.listen(port, () => console.log(`listening on port ${port}`));
