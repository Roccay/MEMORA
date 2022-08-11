const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const locations = ["Competition", "StudyRoom", "Bar"];
function getLocation() {
  return locations;
}
module.exports = {
  getLocation,
};
