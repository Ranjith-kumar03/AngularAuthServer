const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const port = 3000
const app = express()
app.use(cors())
app.use(bodyParser.json())

app.get('/' , function(req, res){
    res.send('hello from server')

})

app.listen(port , function(){
    console.log('server running on localhost: '+port)
})

const api = require('./routes/api')
app.use('/api' , api)