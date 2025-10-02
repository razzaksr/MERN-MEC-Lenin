const data = require('./data.js');

// CRUD Operations
// Read all records
const getAllRecords = () => {
    return data;
}

// Create a new record
const createRecord = (newRecord) => {
    data.push(newRecord);
    return newRecord;
}

module.exports = { getAllRecords, createRecord };