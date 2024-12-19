import { Blog } from '../blog/blog.model';
import { User } from '../users/user.model';

// blockUserFromDB
const blockUserFromDB = async (id: string) => {
  const result = await User.findByIdAndUpdate(
    id,
    {
      isBlocked: true,
    },
    {
      new: true,
    },
  );

  return result;
};

// deleteBlogFromDB
const deleteBlogFromDB = async (id: string) => {
  const result = await Blog.findByIdAndDelete(id);
  return result;
};

// export alll admin services
export const adminServices = {
  blockUserFromDB,
  deleteBlogFromDB,
};
