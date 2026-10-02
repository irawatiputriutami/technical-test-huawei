# Q2: Usage Snapshot Automation

Automated pipeline for periodic data snapshot extraction to CSV and routine stale file maintenance.

---

## 1. File Naming Convention
Snapshots are persisted in the `snapshots/` directory using a chronological and sortable timestamp format:
```text
usage_snapshot_20261002_080000.csv