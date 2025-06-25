import mongoose from "mongoose";
const Schema = mongoose.Schema;
mongoose.connect('mongodb+srv://skandaprasad595:skanda31@cluster0.dvemxcf.mongodb.net/Second-Brain').then(() => console.log("Connected to mongodb")).catch((err) => console.log("Connection error"))
const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: String,
});

const contentSchema = new Schema({
  userId: {
    ref: "User",
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const linkSchema = new Schema({
  hash: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
    unique: true,
  },
});

const shareLinkSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  hash: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const UserModel = mongoose.model("User", userSchema);
export const ContentModel = mongoose.model("Content", contentSchema);
export const LinksModel = mongoose.model("Link", linkSchema);
export const ShareLinkModel = mongoose.model("ShareLink", shareLinkSchema);
