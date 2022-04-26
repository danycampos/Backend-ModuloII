const express = require('express');
const app = express.Router();
const productoModel = require('../../models/producto/producto.model');

//Método Get
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

//Método Put
app.put('/', async (req, res)=>{
  try {
    const _idProducto = req.query._id;
    
    if(!_idProducto || _idProducto.length != 24){
      return res.status(400).json({
        ok:false,
        msg: _idProducto ? "El identificador no es válido, se requiere un id de 24 caracteres" : "No se recibió el identificador del producto",
        cont:{
          _idProducto
        }
      });     
    }
    const encontrarProducto = await productoModel.findOne({ _id: _idProducto });
    if(!encontrarProducto){
      return res.status(400).json({
        ok:false,
        msg: "El producto no se encuentra registrado en la base de datos",
        cont:{
          _idProducto
        }
      });
    }
    
    // const actualizarProducto = await productoModel.updateOne({ _id: _idProducto } , { $set: { ... req.body} });
    const actualizarProducto = await productoModel.findByIdAndUpdate(_idProducto, { $set: { ... req.body} }, {new: true});

    
    return res.status(200).json({
      ok:true,
      msg:"El roducto se actualizó de manera exitosa",
      cont:{
        productoAnterior:encontrarProducto,
        productoActual:actualizarProducto
      }
    });

  } catch (error) {
    console.log(error);
  }
  
});

//Método Delete
app.delete('/', async (req, res) =>{
  try{
      const _idProducto = req.query._id;
      const blnEstado = req.query.blnEstado;

      if(!_idProducto || _idProducto.length != 24){
        return res.status(400).json({
          ok:false,
          msg: _idProducto ? "El identificador no es válido, se requiere un id de 24 caracteres" : "No se recibió el identificador del producto",
          cont:{
            _idProducto
          }
        });
      }

      if(!blnEstado){
        return res.status(400).json({
          ok:false,
          msg: "El blnEstado no se envió",
          cont:{
            _idProducto
          }
        });
      }

        //Esta línea elimina definitivamente el producto
        //const eliminarProducto = await productoModelo.findOneAndDelete( { _id:_idProducto } );
        //Esta línea actualiza el estado "borrado lógico"
        const desactivarProducto = await productoModelo.findOne( {_id:_idProducto }, { $set : { blnEstado: blnEstado }}, { new:true } );

        if(!desactivarProducto){
          return res.status(400).json({
            ok:false,
            msg: "El producto no se logró desactivar de la base de datos",
            cont:{
              _idProducto
            }
          });
        }

        return res.status(200).json({
          ok:true,
          msg: blnEstado ? "El producto se activo de la base de datos": "El producto se desactivo de la base de datos",
          cont:{
            eliminarProducto
          }
        });

  }
  catch(err){
    return res.status(500).json({
      ok:false,
      msg: error,
      cont:{
        _idProducto
      }
    });
  }
});

module.exports = app;