const statrouter = require('express').Router();
const dao = require('./dao');
// Routes/ endpoints
statrouter.get('/', async(req, res) => {
    const records = dao.getAllRecords();
    res.json(records);
});

statrouter.post('/', async(req, res) => {
    const newRecord = req.body;
    const createdRecord = dao.createRecord(newRecord);
    res.json(createdRecord);
});

statrouter.patch('/:usereg', async(req, res) => {
    const usereg = req.params.usereg;
    const updatedRecord = req.body;
    const result = dao.updateRecord(usereg, updatedRecord);
    if (result) {
        res.json(result);
    } else {
        res.status(404).json({ message: 'Record not found' });
    }
});

statrouter.delete('/:usereg', async(req, res) => {
    const usereg = req.params.usereg;
    const result = dao.deleteRecord(usereg);
    if (result) {
        res.json(result);
    } else {
        res.status(404).json({ message: 'Record not found' });
    }
});

module.exports = statrouter;