const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/api/timestamp/:date?', (req, res) => {
  const dateStr = req.params.date;
  let date;

  // Check if the date parameter is provided
  if (!dateStr) {
    // No date provided, return current date
    date = new Date();
  } else {
    // Check if dateStr is a valid Unix timestamp (number) or date string
    if (/^\d+$/.test(dateStr)) {
      // If dateStr is purely numeric, treat it as Unix timestamp in milliseconds
      date = new Date(parseInt(dateStr));
    } else {
      // Otherwise, treat it as a date string
      date = new Date(dateStr);
    }
  }

  // Check if the date is invalid
  if (isNaN(date.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  // Return the Unix timestamp and UTC date string
  return res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

// Listen on the appropriate port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Timestamp microservice running on port ${PORT}`);
});
