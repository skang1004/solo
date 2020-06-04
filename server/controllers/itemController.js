const models = require("../models/mainModel.js");

const itemController = {};

itemController.saveItem = (req, res, next) => {
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

itemController.deleteItem = (req, res, next) => {
  models.Item.deleteOne(req.body, (err, success) => {
    if (err) {
      return next({
        log: "Error in ItemController.deleteItem",
        status: 404,
        message: {
          err: `Check Item Controller: Error: ${err}`,
        },
      });
    }
    return next();
  });
};

module.exports = itemController;
