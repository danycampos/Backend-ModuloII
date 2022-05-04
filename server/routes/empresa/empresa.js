const express = require('express');
const app = express.Router();
const empresaModel = require('../../models/empresa/empresa.model');

//Método Get
app.get('/',  async (req, res) => {
    const blnEstado = req.query.blnEstado == "true" ? true: false;
    const obtenerEmpresa =  await empresaModel.find({ blnEstado: blnEstado  });

    if(obtenerEmpresa.length > 0)
    {        
        return res.status(200).json({
            ok:true,
            msg:"Se encontraron empresas",
            cont:{
                obtenerEmpresa
            }
          });
    }
    else
    {
      return res.status(200).json({
        ok:false,
        msg:"No se encontraron empresas",
        cont:{}
      });

    }


});

//Método Post
app.post('/', async (req, res)=>{
  const body = req.body;
  const obtenerEmpresa = await empresaModel.find({ strNombre:body.strNombre });
  
  if(obtenerEmpresa.length > 0)
  {
      return res.status(400).json({
          ok:false,
          msg:"La empresa no se registro debido a que ya existe",
          cont:{
            obtenerEmpresa
          }
      });

  }

  const empresaBody = new empresaModel(body);
  const err = empresaBody.validateSync();
  if(err){
      return res.status(400).json({
          ok:false,
          msg:"No se recibió uno o mas datos requeridos en el modelo",
          cont:{
              err
          }
      });
  }

  const empresaRegistrado = await empresaBody.save();
  return res.status(200).json({
      ok:true,
      msg:"La empresa se registro de manera exitosa",
      cont:{
        empresaRegistrado
      }
  });
       
});

//Método Put
app.put('/', async (req, res)=>{
  try {
    const _idEmpresa = req.query._id;

    if(!_idEmpresa || _idEmpresa.length != 24){
      return res.status(400).json({
        ok:false,
        msg: _idEmpresa ? "El identificador no es válido, se requiere un id de 24 caracteres" : "No se recibió el identificador de la empresa",
        cont:{
            _idEmpresa
        }
      });     
    }
    const encontrarEmpresa = await empresaModel.findOne({ _id: _idEmpresa  , blnEstado:true});
    if(!encontrarEmpresa){
      return res.status(400).json({
        ok:false,
        msg: "La empresa no se encuentra registrado en la base de datos",
        cont:{
            _idEmpresa
        }
      });
    }
    
    // const actualizarProducto = await productoModel.updateOne({ _id: _idProducto } , { $set: { ... req.body} });
    const actualizarEmpresa = await empresaModel.findByIdAndUpdate(_idEmpresa, { $set: { ... req.body} }, {new: true});

    
    return res.status(200).json({
      ok:true,
      msg:"La empresa se actualizó de manera exitosa",
      cont:{
        empresaAnterior:encontrarEmpresa,
        empresaActual:actualizarEmpresa
      }
    });

  } catch (error) {
    console.log(error);
  }
  
});

//Método Delete
app.delete('/', async (req, res) =>{
  try{
      const _idEmpresa = req.query._id;
      const blnEstado = req.query.blnEstado;


      if(!_idEmpresa || _idEmpresa.length != 24){
        return res.status(400).json({
          ok:false,
          msg: _idEmpresa ? "El identificador no es válido, se requiere un id de 24 caracteres" : "No se recibió el identificador de la empresa",
          cont:{
            _idEmpresa
          }
        });
      }

      if(!blnEstado){
        return res.status(400).json({
          ok:false,
          msg: "El blnEstado no se envió",
          cont:{
            _idEmpresa
          }
        });
      }

        //Esta línea elimina definitivamente el producto
        //const eliminarProducto = await productoModelo.findOneAndDelete( { _id:_idProducto } );
        //Esta línea actualiza el estado "borrado lógico"
        
        const desactivarEmpresa = await empresaModel.findOneAndUpdate( {_id:_idEmpresa }, { $set : { blnEstado: blnEstado }}, { new:true } );

        if(!desactivarEmpresa){
          return res.status(400).json({
            ok:false,
            msg: "La empresa no se logró desactivar de la base de datos",
            cont:{
              desactivarEmpresa
            }
          });
        }

        return res.status(200).json({
          ok:true,
          msg: blnEstado === "true" ? "La empresa se activo de la base de datos" : "La empresa se desactivo de la base de datos",
          cont:{
            desactivarEmpresa
          }
        });

  }
  catch(error){
    return res.status(500).json({
      ok:false,
      msg: 'Error del lado del servidor' + error,
      cont:{
        
      }
    });
  }
});

module.exports = app;