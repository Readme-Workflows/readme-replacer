/**
 * Copyright (c) 2021 The Readme-Workflows organisation and Contributors
 */
/* eslint-disable no-unused-vars */
const fs = require("fs");

const { CUSTOM_REPLACER_FILE, DATETIME } = require("./config");
const customReplacer = require("./customReplacer");
const replacers = require("./replacers.json");

/**
 * @param {string} template Template file content
 */
module.exports = (template) => {
  let customData;
  let customDataExists = true;

  if (!CUSTOM_REPLACER_FILE.toLocaleLowerCase().endsWith(".json")) {
    return {
      result: false,
      str: "CUSTOM_REPLACER_FILE needs to be a json",
    };
  }

  if (!fs.existsSync(CUSTOM_REPLACER_FILE)) customDataExists = false;

  try {
    if (customDataExists) customData = JSON.parse(customData);
  } catch (e) {
    return {
      result: false,
      str: `Couldn't parse the file: ${CUSTOM_REPLACER_FILE}. Make sure it is parsable with JSON.parse()`,
    };
  }

  if (customData && customData.forEach && customDataExists) {
    customData.forEach((data) => {
      let tempReplace = customReplacer(template, data);
      if (tempReplace.result) {
        template = tempReplace.str;
      } else {
        return tempReplace;
      }
    });
  } else if (customDataExists) {
    let tempReplace = customReplacer(template, customData);
    if (tempReplace.result) {
      template = tempReplace.str;
    } else {
      return tempReplace;
    }
  }

  replacers.forEach((item) => {
    template = template
      .split(item.search)
      .join(item.eval ? eval(item.replace) : item.replace);
  });

  return { result: true, str: template, customDataExists: customDataExists };
};
