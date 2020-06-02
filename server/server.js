const path = require("path");
const express = require("express");
const userController = require("./controllers/userController.js");

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

app.get("/login", (req, res) => {
  res.render("../client/components/Login");
});

app.post("/signup", userController.createUser, (req, res) => {
  res.status(200).json(res.locals.newUser);
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
