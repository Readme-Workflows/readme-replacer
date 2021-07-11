const { CUSTOM_REPLACER_FILE } = require("./config");
const replacers = require("./replacers.json");

/**
 * @param {string} templateContent - Template file
 */
module.exports = (templateContent) => {
  replacers.forEach((item) => {
    templateContent = templateContent
      .split(item.search)
      .join(item.eval ? eval(item.replace) : item.replace);
  });

  let customReplacer;

  try {
    customReplacer = fs.readFileSync(CUSTOM_REPLACER_FILE, "utf-8");
  } catch (err) {
    return {
      result: false,
      str: `Couldn't find the file named ${CUSTOM_REPLACER_FILE}`,
    };
  }

  try {
    customReplacer = JSON.parse(customReplacer);
  } catch (e) {
    return {
      result: false,
      str: `Couldn't parse the file: ${CUSTOM_REPLACER_FILE}. Make sure it is parsable with JSON.parse()`,
    };
  }

  if (customReplacer.forEach) {
  } else if (customReplacer.search && customReplacer.replace) {
    if (!customReplacer.eval || customReplacer.replace.length <= 50) {
      templateContent = templateContent
        .split(customReplacer.search)
        .join(
          customReplacer.eval
            ? eval(customReplacer.replace)
            : customReplacer.replace
        );
    } else {
      return {
        result: false,
        str: `Replacer length cannot be more than 50`,
      };
    }
  }

  return { result: true, str: templateContent };
};
