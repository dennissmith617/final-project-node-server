import mongoose from 'mongoose';
const schema = mongoose.Schema({
  profile: String,
  handle: String,
  time: String,
  post: String,
  replies: Number,
  reposts: Number,
  likes: Number,
  liked: Boolean,
  image: String
}, {collection: 'posts'});
export default schema;