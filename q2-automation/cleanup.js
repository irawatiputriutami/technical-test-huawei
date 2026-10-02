const fs = require('fs');
const path = require('path');

const SNAPSHOT_DIR = path.join(__dirname, 'snapshots');
const RETENTION_DAYS = 30;
const RETENTION_MS = RETENTION_DAYS * 24 * 60 * 60 * 1000;

function cleanupOldSnapshots() {
  if (!fs.existsSync(SNAPSHOT_DIR)) {
    console.log(`Directory does not exist: ${SNAPSHOT_DIR}`);
    return;
  }

  const now = Date.now();
  const files = fs.readdirSync(SNAPSHOT_DIR);
  let removedCount = 0;

  console.log(`[${new Date().toISOString()}] Starting cleanup check for snapshots older than ${RETENTION_DAYS} days...`);

  files.forEach((file) => {
    if (file.endsWith('.csv')) {
      const filePath = path.join(SNAPSHOT_DIR, file);
      const stats = fs.statSync(filePath);
      const fileAgeMs = now - stats.mtimeMs;

      if (fileAgeMs > RETENTION_MS) {
        fs.unlinkSync(filePath);
        console.log(`Deleted stale snapshot: ${file} (Age: ${(fileAgeMs / (1000 * 60 * 60 * 24)).toFixed(1)} days)`);
        removedCount++;
      }
    }
  });

  console.log(`Cleanup completed. Total files removed: ${removedCount}`);
}

cleanupOldSnapshots();