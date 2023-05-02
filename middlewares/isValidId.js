const { isValidObjectId } = require("mongoose");

const { HttpError } = require("../helpers");

const isValidId = (req, res, next) => {
  const { movieId } = req.params;
  if (!isValidObjectId(movieId)) {
    next(HttpError(400, "Not valid id"));
  }
  next();
};

module.exports = isValidId;
