const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = process.env.DB_URL;
db.users = require("./user.model.js")(mongoose);
db.comments = require('./comment.model.js')(mongoose);

module.exports = db;