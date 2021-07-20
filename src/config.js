/**
 * Copyright (c) 2021 The Readme-Workflows organisation and Contributors
 */
const core = require("@actions/core");

const getDate = require("./getDate");

const GH_USERNAME = core.getInput("GH_USERNAME");
const TEMPLATE_FILE = core.getInput("TEMPLATE_FILE");
const COMMIT_FILE = core.getInput("COMMIT_FILE");
const CUSTOM_REPLACER_FILE = core.getInput("CUSTOM_REPLACER_FILE");
const COMMIT_MESSAGE = core.getInput("COMMIT_MESSAGE");
const COMMIT_EMAIL = core.getInput("COMMIT_EMAIL");
const COMMIT_NAME = core.getInput("COMMIT_NAME");

const DATETIME = getDate(
  core.getInput("DATE_FORMAT"),
  core.getInput("TIMEZONE")
);

module.exports = {
  GH_USERNAME,
  TEMPLATE_FILE,
  COMMIT_FILE,
  CUSTOM_REPLACER_FILE,
  COMMIT_MESSAGE,
  COMMIT_EMAIL,
  COMMIT_NAME,
  DATETIME,
};
