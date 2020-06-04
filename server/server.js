const path = require("path");
const express = require("express");
const userController = require("./controllers/userController.js");
const itemController = require("./controllers/itemController.js");
const budgetController = require("./controllers/budgetController.js");

const app = express();
const PORT = 3000;

// body parser
app.use(express.json());

if ((process.env.NODE_ENV = "production")) {
  //statically serve build folder
  // app.use("/build", express.static(path.resolve(__dirname, "../build")));

  //handle static files when you create static assets
  app.use(
    "/assets",
    express.static(path.resolve(__dirname, "../client/assets"))
  );

  // respond with main app
  app.get("/", (req, res) =>
    res.status(200).sendFile(path.resolve(__dirname, "../index.html"))
  );
}

// if you have time to work on reload a page
app.get("/spendings", (req, res) => {
  res.status(200);
});

app.post("/spendings", itemController.saveItem, (req, res) => {
  res.status(200).json(res.locals.newItem);
});

app.delete("/spendings", itemController.deleteItem, (req, res) => {
  res.sendStatus(200);
});

app.post(
  "/history",
  budgetController.saveBudget,
  // budgetController.getHistory,
  (req, res) => {
    // res.status(200).json({ history: res.locals.history });
    res.sendStatus(200);
  }
);

app.get("/history", budgetController.getHistory, (req, res) => {
  res.status(200).json({ history: res.locals.history });
});

app.get("/login", (req, res) => {
  res.render("../client/components/Login");
});

app.post("/login", userController.verifyUser, (req, res) => {
  if (res.locals.verified) {
    res
      .status(200)
      .json({ verified: res.locals.verified, user: res.locals.user });
  }
});

app.post("/signup", userController.createUser, (req, res) => {
  res
    .status(200)
    .json({ user: res.locals.newUser, verified: res.locals.verified });
});

// catch all route-handler for unknown requests
app.use("*", (req, res) => res.sendStatus(404));

// express error handler for middlewares
app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 400,
    message: {
      err: "An error occurred",
    },
  };
  const errorObj = Object.assign({}, defaultErr);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// start server on port
app.listen(PORT, () => {
  console.log(`Server starting on port: ${PORT}`);
});

module.exports = app;
