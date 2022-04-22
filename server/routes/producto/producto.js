const express = require('express');
const app = express.Router();
const productoModel = require('../../models/producto/producto.model');

app.get('/',  async (req, res) => {

const obtenerProductos =  await productoModel.find();
console.log(obtenerProductos);

if(obtenerProductos.length > 0)
{
    
    return res.status(200).json({
        ok:true,
        msg:"Se conectó al metódo get de producto",
        cont:{
          obtenerProductos
        }
      });
}
else
{
  return res.status(200).json({
    ok:false,
    msg:"Se conectó al metódo get de producto, no se encontraron productos",
    cont:{
      obtenerProductos
    }
  });

}


});

//Método Post
app.post('/', async (req, res)=>{
  const body = req.body;
  const obtenerProducto = await productoModel.find({ strNombre:body.strNombre });
  
  if(obtenerUsuario.length > 0)
  {
      return res.status(200).json({
          ok:false,
          msg:"El producto no se registro debido a que ya existe",
          cont:{
            obtenerProducto
          }
      });

  }

  const productoBody = new productoModel(body);
  const err = productoBody.validateSync();
  if(err){
      return res.status(200).json({
          ok:false,
          msg:"No se recibió uno o mas datos requeridos en el modelo",
          cont:{
              err
          }
      });
  }

  const productoRegistrado = await productoBody.save();
  return res.status(200).json({
      ok:true,
      msg:"El producto se registro de manera exitosa",
      cont:{
        productoRegistrado
      }
  });
       
});


module.exports = app;