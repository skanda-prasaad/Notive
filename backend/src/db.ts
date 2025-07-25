import mongoose from "mongoose";
const Schema = mongoose.Schema;
import dotenv from "dotenv";
dotenv.config();

mongoose
  .connect(process.env.MONGO_URL as string)
  .then(() => console.log("Connected to mongodb"))
  .catch((err) => console.log("Connection error:", err));

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

const contentSchema = new Schema(
  {
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
    title: {
      type: String,
      required: true,
    },
    paraCategory : {
      type : String,
      required : false,
      default : 'resources'
    }
  },
  { timestamps: true }
);

const linkSchema = new Schema({
  hash: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
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
