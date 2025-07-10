const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let profile = {
  displayName: 'Jane Doe'
};

app.get('/profile', (req, res) => {
  res.json(profile);
});

app.post('/profile', (req, res) => {
  const { displayName } = req.body;
  if (typeof displayName === 'string' && displayName.length > 0) {
    profile.displayName = displayName;
    return res.json({ success: true, displayName });
  }
  return res.status(400).json({ error: 'Invalid displayName' });
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Mock backend running on http://localhost:${PORT}`);
});
