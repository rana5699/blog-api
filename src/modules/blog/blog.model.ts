/* eslint-disable @typescript-eslint/no-explicit-any */
import { Model, Schema, model } from 'mongoose';
import { TBlog } from './bolg.interface';
import { StatusCodes } from 'http-status-codes';
import appError from '../../errors/app.error';

// for authorized
interface BlogModel extends Model<TBlog> {
  authorizedUser(blog: any, userId: string, res: any): void;
}

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
      ref: 'User',
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

// create static for check user is blocked

// create static for check authorized user
blogSchema.static('authorizedUser', function (blog: TBlog, userId: string) {
  // check user is authorized to update this blog
  if (blog.author.toString() !== userId) {
    throw new appError(
      StatusCodes.FORBIDDEN,
      'You are not authorized to perform this action!',
      '',
    );
  }
  return true;
});

// Export Blog model
export const Blog = model<TBlog, BlogModel>('Blog', blogSchema);
