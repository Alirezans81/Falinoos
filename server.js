const express = require("express");
const usersRoutes = require("./src/users/routes");
const reservationsRoutes = require("./src/reservations/routes");

const app = express();
const port = 3000;

require("./config")(app, express);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res) => {
  res.json({
    data: null,
    message: "Welcome!",
  });
});

app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/reservations", reservationsRoutes);

app.listen(port, () => console.log(`listening on port ${port}`));
