import { Schema, model } from "mongoose";
import { TBlog } from "./bolg.interface";

const blogSchema = new Schema<TBlog>(
  {
    title: {
      type: String,
      minlength: 1,
      required: true,
    },
    content: {
      type: String,
      minlength: 1,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Export Blog model
export const Blog = model<TBlog>("Blog", blogSchema);
