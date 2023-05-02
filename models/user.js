const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleSaveErrors } = require("../helpers");

const emailRegexp = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

const subscription = ["starter", "pro", "business"];

const userSchema = new Schema(
  {
    password: {
      type: String,
      minlength: 6,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: emailRegexp,
    },
    subscription: {
      type: String,
      enum: subscription,
      default: "starter",
    },
    token: {
      type: String,
      default: "",
    },
  },
  { versionKey: false }
);

userSchema.post("save", handleSaveErrors);

const registerAndLoginSchema = Joi.object({
  password: Joi.string().min(8).required().messages({
    "any.required": `Set password for user`,
  }),
  email: Joi.string().pattern(emailRegexp).required().messages({
    "any.required": `Email is required`,
  }),
});

const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid(...subscription)
    .required()
    .messages({
      "any.required": `Subscription is required`,
    }),
});

const schemas = {
  registerAndLoginSchema,
  updateSubscriptionSchema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
