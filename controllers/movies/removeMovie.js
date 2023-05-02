const { Movie } = require("../../models/movie");

const { HttpError } = require("../../helpers");

const removeMovie = async (req, res) => {
  const { movieId } = req.params;
  const result = await Movie.findByIdAndRemove(movieId);
  if (!result) {
    throw HttpError(404);
  }
  res.json({ message: "Movie deleted" });
};

module.exports = removeMovie;
