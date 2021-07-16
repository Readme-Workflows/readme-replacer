// eslint-disable-next-line no-unused-vars
const { DATETIME } = require("./config");

/**
 * Copyright (c) 2021 The Readme-Workflows organisation and Contributors
 */

/**
 *
 * @param {string} template Template file content
 * @param {object} replace Replace config
 */
module.exports = (template, replaceData) => {
  if (replaceData.search && replaceData.replace) {
    if (!replaceData.eval || replaceData.replace.length <= 50) {
      template = template
        .split(replaceData.search)
        .join(
          replaceData.eval ? eval(replaceData.replace) : replaceData.replace
        );
    } else {
      return {
        result: false,
        str: `Replacer length cannot be more than 50 for '${replaceData.replace}'`,
      };
    }
  }
  return {
    result: true,
    str: template,
  };
};
