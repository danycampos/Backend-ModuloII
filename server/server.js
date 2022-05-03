require('../server/config');
require('colors');
const mongoose = require("mongoose");
const express = require('express');
const app = express();

app.use(express.urlencoded({extended:true}));
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