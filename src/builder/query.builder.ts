import { FilterQuery, Query } from 'mongoose';

class QuaryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  //   search methos
  searchMethod(searchingFields: string[]) {
    const search = this?.query?.search;
    if (search) {
      this.modelQuery = this.modelQuery.find({
        $or: searchingFields.map(
          (field) =>
            ({
              [field]: { $regex: search, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }

    return this;
  }

  //  filter methods
  filterMethod() {
    const queryObj = { ...this.query };

    const excludesFields = ['search', 'sortBy', 'sortOrder'];

    excludesFields.forEach((field) => delete queryObj[field]);

    this.modelQuery = this.modelQuery.find(queryObj);

    return this;
  }

  // Sort method
  sortMethod() {
    const sortBy = this.query?.sortBy as string;
    const sortOrder = this.query?.sortOrder === 'desc' ? -1 : 1;

    if (sortBy) {
      this.modelQuery = this.modelQuery.sort({ [sortBy]: sortOrder });
    }

    return this;
  }
}
export default QuaryBuilder;
