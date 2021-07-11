const { COMMIT_EMAIL, COMMIT_NAME, COMMIT_MESSAGE } = require("./config");
const exec = require("./execute");

/**
 * Make a commit
 *
 * @returns {Promise<void>}
 */

const commitFile = async () => {
  await exec("git", ["config", "--global", "user.email", COMMIT_EMAIL], false);
  await exec("git", ["config", "--global", "user.name", COMMIT_NAME], false);
  await exec("git", ["add", "."], false);
  await exec("git", ["commit", "-m", COMMIT_MESSAGE], false);
  await exec("git", ["push"], true);
};

module.exports = commitFile;
