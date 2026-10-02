const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// In-memory store
const usageRecords = [];

// POST /api/usage - Record subscriber usage
app.post('/api/usage', (req, res) => {
  const { subscriberId, callMinutes, smsCount, dataUsageMB } = req.body;

  if (!subscriberId || callMinutes == null || smsCount == null || dataUsageMB == null) {
    return res.status(400).json({
      success: false,
      message: 'Missing required fields: subscriberId, callMinutes, smsCount, dataUsageMB'
    });
  }

  const record = {
    id: usageRecords.length + 1,
    subscriberId: String(subscriberId).trim(),
    callMinutes: Number(callMinutes),
    smsCount: Number(smsCount),
    dataUsageMB: Number(dataUsageMB),
    timestamp: new Date().toISOString()
  };

  usageRecords.push(record);

  return res.status(201).json({
    success: true,
    message: 'Usage recorded successfully',
    data: record
  });
});

// GET /api/usage - Retrieve all records or filter by query
app.get('/api/usage', (req, res) => {
  return res.status(200).json({
    success: true,
    totalRecords: usageRecords.length,
    data: usageRecords
  });
});

// GET /api/usage/:subscriberId - Retrieve records by subscriber
app.get('/api/usage/:subscriberId', (req, res) => {
  const { subscriberId } = req.params;
  const filtered = usageRecords.filter(
    (item) => item.subscriberId.toLowerCase() === subscriberId.toLowerCase()
  );

  return res.status(200).json({
    success: true,
    subscriberId,
    totalRecords: filtered.length,
    data: filtered
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});