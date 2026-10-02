const fs = require('fs');
const path = require('path');

const API_URL = 'http://localhost:3000/api/usage';
const OUTPUT_DIR = path.join(__dirname, 'snapshots');

// Helper to format 2 digits
const pad = (n) => String(n).padStart(2, '0');

// Generate filename: usage_snapshot_YYYYMMDD_HHmmss.csv
function generateFilename() {
  const now = new Date();
  const year = now.getFullYear();
  const month = pad(now.getMonth() + 1);
  const day = pad(now.getDate());
  const hours = pad(now.getHours());
  const minutes = pad(now.getMinutes());
  const seconds = pad(now.getSeconds());

  return `usage_snapshot_${year}${month}${day}_${hours}${minutes}${seconds}.csv`;
}

// Convert JSON array of objects to CSV format
function convertToCSV(data) {
  const headers = ['id', 'subscriberId', 'callMinutes', 'smsCount', 'dataUsageMB', 'timestamp'];
  const rows = data.map((item) => [
    item.id,
    item.subscriberId,
    item.callMinutes,
    item.smsCount,
    item.dataUsageMB,
    `"${item.timestamp}"`
  ].join(','));

  return [headers.join(','), ...rows].join('\n');
}

async function takeSnapshot() {
  try {
    console.log(`[${new Date().toISOString()}] Fetching usage data from ${API_URL}...`);
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`Failed to fetch API. Status: ${response.status}`);
    }

    const result = await response.json();
    const records = result.data || [];

    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    const csvContent = convertToCSV(records);
    const filename = generateFilename();
    const filePath = path.join(OUTPUT_DIR, filename);

    fs.writeFileSync(filePath, csvContent, 'utf-8');
    console.log(`Snapshot successfully saved to: ${filePath}`);
    console.log(`Total records captured: ${records.length}`);
  } catch (error) {
    console.error('Error taking snapshot:', error.message);
  }
}

takeSnapshot();