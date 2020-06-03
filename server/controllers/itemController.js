const models = require("../models/mainModel.js");

const itemController = {};

itemController.saveItem = (req, res, next) => {
  console.log("inside item save item");
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
  console.log("req body inside deleteItem", req.body);
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
