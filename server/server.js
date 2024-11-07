

const express = require('express');
const cors = require('cors');
require('dotenv').config();  // Load environment variables
const { masterConnection, getNextSlaveConnection } = require('./config/db');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/posts', require('./routes/posts'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
