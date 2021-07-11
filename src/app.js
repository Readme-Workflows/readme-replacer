const fs = require("fs");
const { Toolkit } = require("actions-toolkit");

const { TEMPLATE_FILE } = require("./config");

Toolkit.run(async (tools) => {
  tools.log.debug(`Starting process...`);

  let templateContent;

  try {
    templateContent = fs.readFileSync(TEMPLATE_FILE, "utf-8");
  } catch (err) {
    return tools.exit.failure(`Couldn't find the file named ${TEMPLATE_FILE}`);
  }
});
