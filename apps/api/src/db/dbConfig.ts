import mongoose from 'mongoose';

export default async function initDb() {
  const dbUser = process.env.MYSQL_USER_ROOT;
  const dbPass = process.env.MYSQL_USER_PASS;
  const host = process.env.MYSQL_HOST;
  const port = process.env.MYSQL_HOST_PORT;
  const queryParams = process.env.MYSQL_PARAMS;

  await mongoose.connect(`mongodb://${dbUser}:${dbPass}@${host}:${port}/?${queryParams}`);
  console.log("Connected to DB");
}
