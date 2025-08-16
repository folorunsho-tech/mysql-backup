import dotenv from "dotenv";
import nodeCron from "node-cron";
import { backup, deleteFilesOlderThan7Days } from "./libs/mysqldump.js";

const cron = nodeCron;
dotenv.config();
cron.schedule("*/30 * * * *", () => {
	console.log("running backup task every 30 minutes");
	backup("/school_backup/");
	deleteFilesOlderThan7Days("/school_backup");
});
