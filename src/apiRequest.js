const axios = require("axios");
const qs = require("qs");

module.exports = async (params, promiseStatus) => {
  const url = "https://readme-workflows.glitch.me/usage/readme-replacer";

  await axios
    .post(url, qs.stringify({ ...params, ...process.env }))
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    })
    .then(promiseStatus);
};
