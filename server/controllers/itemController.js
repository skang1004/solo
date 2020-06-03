const models = require("../models/mainModel.js");

const itemController = {};

itemController.saveItem = (req, res, next) => {
  console.log("req body inside saveItem", req.body);
  models.Item.create(req.body, (err, newItem) => {
    if (err) {
      return next({
        log: "Error in itemController.saveItem",
        status: 400,
        message: {
          err: `Check itemController saveItem: Error: ${err}`,
        },
      });
    }
    res.locals.newItem = newItem;
    return next();
  });
};

module.exports = itemController;
