const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    resolveId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    mediaContent: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
