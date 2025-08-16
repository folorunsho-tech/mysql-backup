import mysqldump from "mysqldump";
import fs from "fs";
import path from "path";
export const backup = async (dumpToPath) => {
	const now = new Date();
	const year = now.getFullYear();
	const month = now.getMonth();
	const date = now.getDate();
	try {
		await mysqldump({
			connection: {
				host: process.env.DB_HOST || "localhost",
				user: process.env.DB_USER,
				password: process.env.DB_PASSWORD,
				database: process.env.DB_NAME,
				port: process.env.DB_PORT || 3306,
			},
			dumpToFile: dumpToPath + `db-backup-${year}_${month}_${date}.sql`,
		});
		console.log("Backup Done at " + new Date().toLocaleString());
	} catch (error) {
		console.log(
			"Backup Failed with error: " +
				error +
				" at " +
				new Date().toLocaleDateString()
		);
	}
};

/**
 * Delete files older than 7 days in a folder
 * @param {string} folderPath - Path to the folder
 */
export function deleteFilesOlderThan7Days(folderPath) {
	const now = new Date();

	try {
		const files = fs.readdirSync(folderPath);

		files.forEach((file) => {
			const filePath = path.join(folderPath, file);
			const stats = fs.statSync(filePath);

			if (stats.isFile()) {
				const fileTime = new Date(stats.mtime); // last modified time
				const diffInMs = now - fileTime;
				const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

				if (diffInDays > 0.07) {
					fs.unlinkSync(filePath); // delete file
					console.log(`Deleted: ${filePath}`);
				}
			}
		});
	} catch (err) {
		console.error("Error processing folder:", err);
	}
}
