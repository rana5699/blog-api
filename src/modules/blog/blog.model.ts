/* eslint-disable @typescript-eslint/no-explicit-any */
import { Model, Schema, model } from 'mongoose';
import { TBlog } from './bolg.interface';
import responseHandelar from '../../utilities/resposeHandelar';
import { StatusCodes } from 'http-status-codes';

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
blogSchema.static(
  'authorizedUser',
  function (blog: TBlog, userId: string, res: any) {
    // check user is authorized to update this blog
    if (!blog || blog.author.toString() !== userId) {
      responseHandelar(
        res,
        StatusCodes.FORBIDDEN,
        false,
        'You are not the author of this blog !',
        null,
      );
    }
  },
);

// Export Blog model
export const Blog = model<TBlog, BlogModel>('Blog', blogSchema);
