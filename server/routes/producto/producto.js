const express = require('express');
const app = express.Router();
const productoModel = require('../../models/producto/producto.model');

app.get('/',  async (req, res) => {

const obtenerProductos =  await productoModel.find();
console.log(obtenerProductos);

return res.status(200).json({
    ok:true,
    msg:"Se conectó al metódo get de producto",
    cont:{
      obtenerProductos
    }
   });
});

module.exports = app;