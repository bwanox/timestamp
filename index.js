const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/api/timestamp/:date?', (req, res) => {
  const dateStr = req.params.date;
  let date;

  if (!dateStr) {
    date = new Date();  
  } else {
    const timestamp = Number(dateStr);
    date = isNaN(timestamp) ? new Date(dateStr) : new Date(timestamp);
  }

  if (isNaN(date.getTime())) {
    res.json({ error: "Invalid Date" });
  } else {
    res.json({ unix: date.getTime(), utc: date.toUTCString() });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Timestamp microservice running on port ${PORT}`));
