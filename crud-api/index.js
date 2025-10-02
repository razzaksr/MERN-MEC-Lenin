const app = require('express')();
const dao = require('./dao');
const parser = require('body-parser');

app.use(parser.json());

// Routes/ endpoints
app.get('/', async(req, res) => {
    const records = dao.getAllRecords();
    res.json(records);
});

app.post('/', async(req, res) => {
    const newRecord = req.body;
    const createdRecord = dao.createRecord(newRecord);
    res.json(createdRecord);
});

const PORT = 1234;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});