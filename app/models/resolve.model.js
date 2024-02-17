const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resolveSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    media_content: {
      type: Array,
      default: [],
    },
    category: {
      type: Array,
      default: [],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    post_as: {
      type: String,
      required: true,
    },
    likes: {
      type: Array,
      default: [],
    },
    numberOfLikes: {
      type: Number,
      default: 0,
    },
    dislikes: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

{
  /*resolveSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
}); */
}

const Resolve = mongoose.model('Resolve', resolveSchema);
module.exports = Resolve;
