const moment = require("moment");

export const fromNowOrNow = (a) => {
  // console.log(moment().diff(moment(a)));
  if (Math.abs(moment().diff(moment(a))) < 25000) {
    // 25 seconds before or after now
    return "just now";
  }
  // console.log(moment(a).fromNow());
  return moment(a).startOf("hour").fromNow();
};
