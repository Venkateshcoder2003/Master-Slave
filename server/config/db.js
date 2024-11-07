
// //config/db.js
const mongoose = require('mongoose');
require('dotenv').config();  // Load environment variables

// Master database connection
const masterConnection = mongoose.createConnection(process.env.MASTER_DB_URI, {
    readPreference: 'primary'  // Set master to primary read preference
});

// Array of slave database connections
const slaveConnections = [
    process.env.SLAVE_DB_URI_1,
    process.env.SLAVE_DB_URI_2
].map(uri =>
    mongoose.createConnection(uri, {
        readPreference: 'secondary'  // Ensure read operations go to slaves
    })
);

// Round-robin counter for slave selection
let currentSlaveIndex = 0;

// Function to get next slave connection (round-robin)
const getNextSlaveConnection = () => {
    const connection = slaveConnections[currentSlaveIndex];
    currentSlaveIndex = (currentSlaveIndex + 1) % slaveConnections.length;
    return connection;
};

module.exports = {
    masterConnection,
    getNextSlaveConnection,
    slaveConnections  // Export this for use in replication
};
