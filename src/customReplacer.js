/**
 * Copyright (c) 2021 The Readme-Workflows organisation and Contributors
 */

/**
 *
 * @param {string} template Template file content
 * @param {object} replace Replace config
 */
const { inspect } = require("util");
module.exports = (template, replaceData) => {
  if (replaceData.search && replaceData.replace) {
    if (!replaceData.eval || replaceData.replace.length <= 50) {
      let replace = replaceData?.eval
        ? eval(replaceData.replace)
        : replaceData.replace;
      if (typeof replace !== "string") replace = inspect(replace, { depth: 0 });
      template = template.split(replaceData.search).join(replace);
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
