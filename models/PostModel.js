import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    title: { type: String, trim: true, unique: false, required: true },
    username: { type: String, required: true, unique: false },
    category: { type: String, required: true, unique: false },
    media: {
      contentId: { type: String, unique: true, required: true },
      path: { type: String, unique: true, required: true },
    },
  },
  { timestamps: true },
);

const PostModel = mongoose.model('Posts', postSchema);

const save = async model => new PostModel(model).save();

const getPostByUser = async username => PostModel.findOne({ username });

const getPostById = async _id => PostModel.findById({ _id });

const getRandomPosts = async () => PostModel.find();

const getPostByCategory = async category => PostModel.find({ category }); 

const findByIdAndRemove = async _id => PostModel.findById ({_id})

export { save, getPostByUser, getRandomPosts, getPostById, getPostByCategory, findByIdAndRemove};