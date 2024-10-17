const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/api/timestamp/:date?', (req, res) => {
  const dateStr = req.params.date;
  let date;

  // If no date string is provided, return the current date/time
  if (!dateStr) {
    date = new Date();  
  } else {
    // Check if the provided dateStr is a valid timestamp or a date string
    if (!isNaN(dateStr)) {
      date = new Date(Number(dateStr)); // Parse as Unix timestamp
    } else {
      date = new Date(dateStr); // Parse as date string
    }
  }

  // If the date is invalid, return an error
  if (isNaN(date.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  // Return the Unix timestamp and the UTC string
  return res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Timestamp microservice running on port ${PORT}`));
