import dotenv from "dotenv";

import path from "path";

dotenv.config({ path: path.join((process.cwd(), ".env")) });

export default {
  node_dev: process.env.NODE_ENV,
  port: process.env.PORT,
  salt_round: process.env.SALT_ROUND,
  dataBase: process.env.DATABASEURL,
  jwt_access_token: process.env.JWT_ACCESS_TOKEN,
};
