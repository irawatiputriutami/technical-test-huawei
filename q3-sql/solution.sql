-- ==========================================================
-- Q3: Subscriber & Usage SQL Queries
-- ==========================================================

-- 1. Insert a new subscriber named Fajar, Basic plan, activated 24 January 2024
INSERT INTO subscribers (id, name, plan, activation_date)
VALUES ('SUB07', 'Fajar', 'Basic', '2024-01-24');

-- 2. Update Fajar's plan to Premium
UPDATE subscribers
SET plan = 'Premium'
WHERE name = 'Fajar';

-- 3. Calculate total data usage (MB) across all snapshots for Premium subscribers
SELECT 
    SUM(u.dataUsageMB) AS total_premium_data_usage_mb
FROM usage u
JOIN subscribers s ON u.subscriberId = s.id
WHERE s.plan = 'Premium';

-- 4. Sort and display top 3 subscribers by total data usage across all snapshots
SELECT 
    s.id AS subscriber_id,
    s.name AS subscriber_name,
    SUM(u.dataUsageMB) AS total_data_usage_mb
FROM subscribers s
JOIN usage u ON s.id = u.subscriberId
GROUP BY s.id, s.name
ORDER BY total_data_usage_mb DESC
LIMIT 3;

-- 5. Subquery: find subscribers whose average call minutes per snapshot is <= 30
SELECT 
    id, 
    name, 
    plan
FROM subscribers
WHERE id IN (
    SELECT subscriberId
    FROM usage
    GROUP BY subscriberId
    HAVING AVG(callMinutes) <= 30
);