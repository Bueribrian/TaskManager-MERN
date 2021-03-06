const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
var whitelist = ['http://localhost:3000','http://localhost:3001']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}


app.use(cors(corsOptions));
app.use(express.json())

app.set('port',5000)

// Router
const taskRoutes = require('./routes/task.route')
app.use('/task',taskRoutes)




mongoose.connect('mongodb://papaguacha:palermo1996@ds237855.mlab.com:37855/task-manager', { useNewUrlParser:true })
    .then(() => { 
        console.log('Mongoose conectado correctamente')
        app.listen(app.get('port'),()=>{
            console.log('Server funcionando en el puerto ' + app.get('port'))
        })
     },
    err => { if(err) throw err }
  );

    