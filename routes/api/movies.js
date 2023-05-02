const express = require("express");

const { ctrlWrapper } = require("../../helpers");

const ctrl = require("../../controllers/movies");

const { validateBody, isValidId, authenticate } = require("../../middlewares");

const { schemas } = require("../../models/movie");

const router = express.Router();

router.get("/", authenticate, ctrlWrapper(ctrl.moviesList));

router.get(
  "/:movieId",
  authenticate,
  isValidId,
  ctrlWrapper(ctrl.getMoviesById)
);

router.post(
  "/",
  authenticate,
  validateBody(schemas.addSchema),
  ctrlWrapper(ctrl.addMovies)
);

router.put(
  "/:movieId",
  authenticate,
  isValidId,
  validateBody(schemas.addSchema),
  ctrlWrapper(ctrl.updateMoviest)
);

router.delete("/:movieId", authenticate, ctrlWrapper(ctrl.removeMovies));

module.exports = router;
