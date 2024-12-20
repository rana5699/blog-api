# Blog Application API

This application involves developing a backend for a blogging platform. Users can **create**, **update**, and **delete** their own blogs and **read** all blogs. **admins** have elevated permissions to manage the blogging platform but are restricted from modifying blog content directly. **admin** can **delete** any blog from the platform and can **block** users. The system will include secure authentication, role-based access control, and a public API for viewing blogs with search, sort, and filter features.

---

## Features !!

- Add, Get, update, and delete blogs.
- Supports **search**, **sorting**, and **filtering** functionalities.
- This blog api properly secure with **JWT**.

---

### `Technologies` Used

- Backend : `Express.js` with `TypeScript`
- Database : `MongoDB` with `Mongoose`
- Error Handling : Fllow globals errorHandle model
- Environment Variables : Managed with `dotenv`

## Run Locally

Clone the project

```bash
  git clone https://github.com/rana5699/blog-api.git
```

Go to the project directory

```bash
 cd blog-application

```

Install dependencies

```bash
  npm install -y
```

Start the server

```bash
  npm run dev
```

## Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file

`PORT`

`DATABASEURL`

`NODE_ENV`

`JWT_ACCESS_TOKEN`

`SALT_ROUND`

`NODE_ENV`

## API Reference

### Authentication

## Users

### Register User (POST)

```http
  /api/auth/register
```

#### Login user (POST)

```http
  /api/auth/login
```

## Blog Management

#### Create Blog (POST)

```http
  /api/blogs
```

#### Update Blog (PATcH)

```http
  /api/blogs/:id
```

#### Delete Blog (DELETE)

```http
  /api/blogs/:id
```

#### Get All Blogs (Public) (POST)

```http
  /api/blogs
```

| Parameter   | Type     | Description                                                                                       |
| :---------- | :------- | :------------------------------------------------------------------------------------------------ |
| `search`    | `string` | Search blogs by title or content (e.g., `search=blogtitle`).                                      |
| `sortBy`    | `string` | Sort blogs by specific fields such as createdAt or title (e.g., `sortBy=title`).                  |
| `sortOrder` | `string` | Defines the sorting order. Accepts asc (ascending) or desc (descending) (e.g., `sortOrder=desc`). |
| `filter`    | `string` | Filter blogs by author ID (e.g., `author=authorId`).                                              |

## Example Request URL:

```http
/api/blogs?search=dhaka&sortBy=createdAt&sortOrder=desc&filter=6765280d9b9e64e833de2eb3

```

#### Admin Actions

### Block User (PATcH)

```http
 /api/admin/users/:userId/block
```

| Parameter | Type     | Description                        |
| :-------- | :------- | :--------------------------------- |
| `userId`  | `string` | **Required**. Id of user to block. |

### Delete any blog

```http
   /api/admin/blogs/:id
```

| Parameter   | Type     | Description                        |
| :---------- | :------- | :--------------------------------- |
| `productId` | `string` | **Required**. Id of blog to delete |

## Server Live URL

https://assignment-3-blog-api.vercel.app/
