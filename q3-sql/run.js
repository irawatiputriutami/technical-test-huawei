const { DatabaseSync } = require('node:sqlite');
const db = new DatabaseSync(':memory:');

// Setup schema and seed initial sample data
db.exec(`
  CREATE TABLE subscribers (
    id TEXT PRIMARY KEY,
    name TEXT,
    plan TEXT,
    activation_date TEXT
  );

  CREATE TABLE usage (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    subscriberId TEXT,
    callMinutes INTEGER,
    smsCount INTEGER,
    dataUsageMB INTEGER,
    timestamp TEXT
  );

  INSERT INTO subscribers VALUES
    ('SUB01', 'Amir', 'Basic', '2023-01-12'),
    ('SUB02', 'Sari', 'Premium', '2022-05-03'),
    ('SUB03', 'Budi', 'Basic', '2024-09-20'),
    ('SUB04', 'Dewi', 'Family', '2021-02-15'),
    ('SUB05', 'Rian', 'Premium', '2023-08-08'),
    ('SUB06', 'Nia', 'Basic', '2024-11-30');

  INSERT INTO usage (subscriberId, callMinutes, smsCount, dataUsageMB, timestamp) VALUES
    ('SUB01', 40, 10, 1500, '2025-08-01 08:00'),
    ('SUB01', 35, 8, 1200, '2025-08-01 12:00'),
    ('SUB02', 90, 20, 6000, '2025-08-01 08:00'),
    ('SUB02', 85, 18, 5800, '2025-08-01 12:00'),
    ('SUB03', 20, 5, 500, '2025-08-01 08:00'),
    ('SUB04', 150, 30, 9000, '2025-08-01 08:00'),
    ('SUB05', 70, 15, 5000, '2025-08-01 08:00'),
    ('SUB06', 25, 6, 700, '2025-08-01 08:00');
`);

console.log('=== Task 1: Insert New Subscriber (Fajar) ===');
db.prepare("INSERT INTO subscribers (id, name, plan, activation_date) VALUES ('SUB07', 'Fajar', 'Basic', '2024-01-24')").run();
console.table(db.prepare("SELECT * FROM subscribers WHERE name = 'Fajar'").all());

console.log('\n=== Task 2: Update Fajar Plan to Premium ===');
db.prepare("UPDATE subscribers SET plan = 'Premium' WHERE name = 'Fajar'").run();
console.table(db.prepare("SELECT * FROM subscribers WHERE name = 'Fajar'").all());

console.log('\n=== Task 3: Total Data Usage for Premium Subscribers ===');
const query3 = db.prepare(`
  SELECT 
    SUM(u.dataUsageMB) AS total_premium_data_usage_mb
  FROM usage u
  JOIN subscribers s ON u.subscriberId = s.id
  WHERE s.plan = 'Premium'
`).all();
console.table(query3);

console.log('\n=== Task 4: Top 3 Subscribers by Total Data Usage ===');
const query4 = db.prepare(`
  SELECT 
    s.id AS subscriber_id,
    s.name AS subscriber_name,
    SUM(u.dataUsageMB) AS total_data_usage_mb
  FROM subscribers s
  JOIN usage u ON s.id = u.subscriberId
  GROUP BY s.id, s.name
  ORDER BY total_data_usage_mb DESC
  LIMIT 3
`).all();
console.table(query4);

console.log('\n=== Task 5: Subquery - Avg Call Minutes <= 30 ===');
const query5 = db.prepare(`
  SELECT id, name, plan
  FROM subscribers
  WHERE id IN (
    SELECT subscriberId
    FROM usage
    GROUP BY subscriberId
    HAVING AVG(callMinutes) <= 30
  )
`).all();
console.table(query5);