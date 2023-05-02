const { Movie } = require("../../models/movie");

const movieList = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 12 } = req.query;
  const skip = (page - 1) * limit;

  const result = await Movie.find({ owner }, "", { skip, limit });

  res.json(result);
};

module.exports = movieList;
