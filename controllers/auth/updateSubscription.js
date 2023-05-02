const { User } = require("../../models/user");

const { HttpError } = require("../../helpers");

const updateSubscription = async (req, res) => {
  const { _id: userId } = req.user;

  const result = await User.findByIdAndUpdate(userId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404);
  }

  res.json(result);
};

module.exports = updateSubscription;
