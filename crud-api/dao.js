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

// Update record
const updateRecord = (usereg, updatedRecord) => {
    const index = data.findIndex(record => record.regno === usereg);
    if (index !== -1) {
        data[index] = { ...data[index], ...updatedRecord };
        return data[index];
    }
    return null;
}

// delete record by regno
const deleteRecord = (usereg) => {
    const index = data.findIndex(record => record.regno === usereg);
    if (index !== -1) {
        // splice(start,count)
        const deletedRecord = data.splice(index, 1);
        return deletedRecord[0];
    }
    return null;
}

module.exports = { getAllRecords, createRecord, updateRecord, deleteRecord };