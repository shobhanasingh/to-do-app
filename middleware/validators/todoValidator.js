const { body, query, param } = require("express-validator");

exports.createTodoValidator = [
  body("task").notEmpty().withMessage("Text is required"),
  body("priority")
    .optional()
    .isIn(["low", "medium", "high"])
    .withMessage("priority must be low , medium , high"),
];

exports.updateTodoValidator = [
  body("task").optional().notEmpty().withMessage("Text cannot be empty"),
  body("priority")
    .optional()
    .isIn(["low", "medium", "high"])
    .withMessage("Invalid priority value"),
];

exports.todoQueryValidator = [
  query("priority")
    .optional()
    .isIn(["low", "medium", "high"])
    .withMessage("Priority filter must be one of : low,medum,high"),
];
