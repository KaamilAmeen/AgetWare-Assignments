const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const loanRoutes = require('./routes/loanRoutes.js');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api', loanRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Bank Loan System running on http://localhost:${PORT}`);
});
