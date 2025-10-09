const app = require('express')()
const communicate = require('./contact.js')
const perm = require('./permcontroller.js')
const stat = require('./statcontroller.js')
const atlas = require('./atlascontroller.js')
const auth = require('./usercontroller.js')
const parser = require('body-parser')
const cors = require('cors')

app.use(parser.json())
// which calls the establish function at contact js
communicate()

// routers
app.use('/actual', perm)
app.use(cors())
app.use('/stat', stat)
app.use('/db',atlas)
app.use('/auth',auth)

const PORT = 1234

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})