const dateFormat = require("dateformat");

module.exports = (format, timezone) => {
  let finalDate;
  let offset;

  if (timezone.split("/").length === 2) {
    process.env.TZ = timezone;
    finalDate = new Date();
  } else {
    let tz = timezone.replace("GMT", "").split(":");
    let tz_hours = parseInt(tz[0].trim());

    if (tz.length > 1) {
      offset = tz_hours * 60 + parseInt(tz[1].trim());
    } else {
      if (tz_hours > 99) {
        offset = Math.floor(tz_hours / 100) * 60 + (tz_hours % 100);
      } else {
        offset = tz_hours * 60;
      }
    }

    const utc = new Date().getTime() + new Date().getTimezoneOffset() * 60000;
    finalDate = new Date(utc + offset * 60000);
  }

  return dateFormat(finalDate, format);
};
