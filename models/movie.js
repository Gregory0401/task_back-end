const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleSaveErrors } = require("../helpers");

const dateRegexp =
  /^(d{1,2}|m{1,2}|y{4}|y{2})([^a-zA-Z0-9]+)(d{1,2}|m{1,2}|y{4}|y{2})\2(d{1,2}|m{1,2}|y{4}|y{2})$/;

const movieSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Set title for movie"],
    },
    director: {
      type: String,
      required: [true, "Set director for movie"],
    },
    date: {
      type: Date,
      match: dateRegexp,
      required: [true, "Set premier date for movie"],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false }
);

movieSchema.post("save", handleSaveErrors);

const addSchema = Joi.object({
  title: Joi.string().required().messages({
    "any.required": `missing required title field`,
  }),
  director: Joi.string().required().messages({
    "any.required": `missing required director field`,
  }),
  date: Joi.Date()
    .regex(dateRegexp)
    .validate(function (date) {
      const result = date < new Date();
      return result;
    })
    .trim()
    .required()
    .messages({
      "any.required": `missing required date field`,
    }),
});

const schemas = {
  addSchema,
};

const Movie = model("movies", movieSchema);

module.exports = {
  Movie,
  schemas,
};
