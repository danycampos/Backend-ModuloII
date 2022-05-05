require('../server/config');
require('colors');
const mongoose = require("mongoose");
const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE, PATCH');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE, PATCH');
  next();

});

app.use('/api', require('./routes/index'));

console.log(process.env.URLDB, 'URLDB');

mongoose.connect(process.env.URLDB, {
    //useNewUrlParse:true
    //useUnifiedTopology:true
    // useCreateIndex:true    
},(err, resp) =>{
  if(err){
      console.log(`Error al conectarse a la B.D. ${process.env.URLDB}`.red);
      return err;
  }
  else{
    console.log(`Se conectó a la B.D. ${process.env.URLDB}`.green);
  }
}
);

app.listen(process.env.port, ()=> {
    console.log('[Node]'.green,' esta corriendo en el puerto', (process.env.port).blue);
})