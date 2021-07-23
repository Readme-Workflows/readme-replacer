/**
 * Copyright (c) 2021 The Readme-Workflows organisation and Contributors
 */
const { spawn } = require("child_process");

const apiRequest = require("./apiRequest");
const { COMMIT_EMAIL, COMMIT_NAME, GH_USERNAME } = require("./config");

let reqParams = {
  username: GH_USERNAME,
  commit_name: COMMIT_NAME,
  commit_email: COMMIT_EMAIL,
  key: "README_REPLACER_URL",
  params: "README_REPLACER_PARAMS",
  passkey: "README_REPLACER_PASSKEY",
};

/**
 * Execute shell command
 * @param {String} cmd - root command
 * @param {String[]} args - args to be passed along with
 *
 * @returns {Promise<void>}
 */

const exec = (cmd, args = [], callAPI) =>
  new Promise((resolve, reject) => {
    const app = spawn(cmd, args, { stdio: "pipe" });
    let stdout = "";
    app.stdout.on("data", (data) => {
      stdout = data;
    });
    app.on("close", (code) => {
      if (code !== 0 && !stdout.includes("nothing to commit")) {
        let err = new Error(`Invalid status code: ${code}`);
        err.code = code;
        console.log(err)
        if (callAPI) {
          apiRequest({ ...reqParams, status: "failure" }, () => reject(err));
        } else {
          return reject(err);
        }
        //return reject(err);
      } else {
        if (callAPI) {
          apiRequest({ ...reqParams, status: "success" }, () => resolve(code));
        } else {
          return resolve(code);
        }
        //return resolve(code);
      }
    });
    app.on("error", (error) => {
      if (callAPI) {
        apiRequest({ ...reqParams, status: "failure" }, () => reject(error));
      } else {
        reject(error);
      }
    });
    //app.on("error", reject);
  });

module.exports = exec;
