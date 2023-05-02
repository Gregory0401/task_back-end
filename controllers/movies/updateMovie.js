const { Movie } = require("../../models/movie");

const { HttpError } = require("../../helpers");

const updateMovie = async (req, res) => {
  const {movieId } = req.params;
  const result = await Movie.findByIdAndUpdate(movieId, req.body, {
    new: true,
  });

  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

module.exports = updateMovie;
