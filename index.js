const express = require('express');
const app = express();

app.get('/api/timestamp/:date?', (req, res) => {
  const dateStr = req.params.date;
  let date;

  if (!dateString) {
    date = new Date();  // Current date
  } else {
    const timestamp = Number(datestr);
    date = isNaN(timestamp) ? new Date(dateStr) : new Date(timestamp);
  }

  if (isNaN(date.getTime())) {
    res.json({ error: "Invalid Date" });
  } else {
    res.json({ unix: date.getTime(), utc: date.toUTCString() });
  }
});

app.listen(3000, () => console.log('Timestamp microservice running on port 3000'));
