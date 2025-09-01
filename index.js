import dotenv from "dotenv";
import nodeCron from "node-cron";
import { backup, deleteFilesOlderThan7Days } from "./libs/mysqldump.js";

const cron = nodeCron;
dotenv.config();
const path = process.env.UPLOAD_PATH || "./backup/";
const cron_expression = process.env.CRON_EXPRESSION || "* */30 * * * *";
cron.schedule(cron_expression, (ctx) => {
	const task_date = ctx.triggeredAt.toLocaleString();
	backup(path, task_date);
	deleteFilesOlderThan7Days(path);
});
