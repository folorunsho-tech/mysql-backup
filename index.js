import dotenv from "dotenv";
import nodeCron from "node-cron";
import { backup, deleteFilesOlderThan7Days } from "./libs/mysqldump.js";

const cron = nodeCron;
dotenv.config();
const path = process.env.UPLOAD_PATH || "./backup/";
cron.schedule("*/30 * * * *", () => {
	backup(path);
	deleteFilesOlderThan7Days(path);
});
