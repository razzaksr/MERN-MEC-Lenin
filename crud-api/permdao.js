const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'perm.json');


// read from file
const read = () =>{
    const records = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(records);
}
// write to file
const write = (data) =>{
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

// CRUD Operations
// Read all records
const getAllRecords = () => {
    return read();
}

// Create a new record read exists add new finally write
const createRecord = (newRecord) => {
    const local = read();
    local.push(newRecord);
    write(local);
    return newRecord;
}

// Update record >> read exists, find, update and write
const updateRecord = (usereg, updatedRecord) => {
    const data = read();
    const index = data.findIndex(record => record.regno === usereg);
    if (index !== -1) {
        data[index] = { ...data[index], ...updatedRecord };
        write(data);
        return data[index];
    }
    return null;
}

// delete record by regno >> read exists, find, delete and write
const deleteRecord = (usereg) => {
    const data = read();
    const index = data.findIndex(record => record.regno === usereg);
    if (index !== -1) {
        // splice(start,count)
        const deletedRecord = data.splice(index, 1);
        write(data);
        return deletedRecord[0];
    }
    return null;
}

module.exports = { getAllRecords, createRecord, updateRecord, deleteRecord };