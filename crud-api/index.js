const app = require('express')();
// const dao = require('./dao');
const dao = require('./permdao');
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

app.patch('/:usereg', async(req, res) => {
    const usereg = req.params.usereg;
    const updatedRecord = req.body;
    const result = dao.updateRecord(usereg, updatedRecord);
    if (result) {
        res.json(result);
    } else {
        res.status(404).json({ message: 'Record not found' });
    }
});

app.delete('/:usereg', async(req, res) => {
    const usereg = req.params.usereg;
    const result = dao.deleteRecord(usereg);
    if (result) {
        res.json(result);
    } else {
        res.status(404).json({ message: 'Record not found' });
    }
});

const PORT = 1234;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});