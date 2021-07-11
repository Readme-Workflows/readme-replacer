const fs = require("fs");
const { Toolkit } = require("actions-toolkit");

const { TEMPLATE_FILE, COMMIT_FILE } = require("./config");
const replace = require("./replace");
const commitFile = require("./commitFile");

Toolkit.run(async (tools) => {
  tools.log.debug(`Starting process...`);

  let templateContent;

  try {
    templateContent = fs.readFileSync(TEMPLATE_FILE, "utf-8");
  } catch (err) {
    return tools.exit.failure(`Couldn't find the file named ${TEMPLATE_FILE}`);
  }

  let replaceContent = replace(templateContent);
  if (replaceContent.result) {
    try {
      fs.writeFileSync(COMMIT_FILE, replaceContent.str);
      await commitFile();
    } catch (e) {
      return tools.exit.failure(e);
    }
  } else {
    return tools.exit.failure(replaceContent.str);
  }
});
