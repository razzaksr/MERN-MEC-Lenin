const app = require('express')();
const perm = require('./permcontroller.js')
const stat = require('./statcontroller.js');
const parser = require('body-parser');

app.use(parser.json());

// routers
app.use('/actual', perm);
app.use('/stat', stat);

const PORT = 1234;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});