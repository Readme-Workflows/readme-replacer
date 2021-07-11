const core = require("@actions/core");

const GH_USERNAME = core.getInput("CONFIG_FILE");
const TEMPLATE_FILE = core.getInput("TEMPLATE_FILE");
const COMMIT_FILE = core.getInput("COMMIT_FILE");
const CUSTOM_REPLACER_FILE = core.getInput("CUSTOM_REPLACER_FILE");
const COMMIT_MESSAGE = core.getInput("COMMIT_MESSAGE");
const COMMIT_EMAIL = core.getInput("COMMIT_EMAIL");
const COMMIT_NAME = core.getInput("COMMIT_NAME");

module.exports = {
  GH_USERNAME,
  TEMPLATE_FILE,
  COMMIT_FILE,
  CUSTOM_REPLACER_FILE,
  COMMIT_MESSAGE,
  COMMIT_EMAIL,
  COMMIT_NAME,
};
