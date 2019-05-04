const express = require('express')
const app = express()

app.use(express.json())
app.set('port', process.env.PORT || 5000)

app.listen(app.get('port'),()=>{
    console.log('Server funcionando en el puerto' + app.get('port'))
})