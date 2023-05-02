const { Movie } = require("../../models/movie");

const { HttpError } = require("../../helpers");

const getMovieById = async (req, res) => {
  const { movieId } = req.params;
  const result = await Movie.findById(movieId);
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

module.exports = getMovieById;
