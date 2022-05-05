const express = require('express');
const app = express.Router();
const bcrypt = require('bcrypt');
const usuarioModel = require('../../models/usuario/usuario.model');

//Método get
app.get('/',  async (req, res) => {
const blnEstado = req.query.blnEstado == "true" ? true: false;
// const obtenerUsuarios =  await usuarioModel.find({ blnEstado: cblnEstado  },{ strContrasena:0 });
const obtenerUsuarios =  await usuarioModel.aggregate([
    {$match:{blnEstado:blnEstado}},
    {
        $lookup:{
            from:"empresas",
            localField:"idEmpresa",
            foreignField: "_id",
            as:"empresa"
        }
    }
]);


if(obtenerUsuarios.length > 0)
{
    return res.status(200).json({
        ok:true,
        msg:"Se encontraron usuarios",
        cont:{
            obtenerUsuarios
        }
    });
    }
    else{
        return res.status(200).json({
            ok:false,
            msg:"Se conectó al metódo get de usuarios, no se encontraron usuarios",
            cont:{
                obtenerUsuarios
            }
        });
    }

});

//Método Post
app.post('/', async (req, res)=>{
    const body = { ...req.body, strContrasena: req.body.strContrasena ? bcrypt.hashSync(req.body.strContrasena, 10) : undefined };    
    const encontroEmail = await usuarioModel.find( { strEmail: body.strEmail } );
    const encontroNombreUsuario = await usuarioModel.find( { strNombreUsuario: body.strNombreUsuario } );
    
    console.log(body);
   console.log(encontroEmail);

    if(encontroEmail.length > 0 )
    {
        return res.status(200).json({
            ok:false,
            msg:"El usuario no se registro debido a que ya existe el email",
            cont:{
                encontroEmail
            }
        });

    }

    if(encontroNombreUsuario.length > 0 )
    {
        return res.status(200).json({
            ok:false,
            msg:"El usuario no se registro debido a que ya existe el nombre de usuario",
            cont:{
                encontroNombreUsuario
            }
        });

    }

    const usuarioBody = new usuarioModel(body);
    const err = usuarioBody.validateSync();
    if(err){
        return res.status(200).json({
            ok:false,
            msg:"No se recibió uno o mas datos requeridos en el modelo",
            cont:{
                err
            }
        });
    }

    const usuarioRegistrado = await usuarioBody.save();

    return res.status(200).json({
        ok:true,
        msg:"El usuario se registro de manera exitosa",
        cont:{
            usuarioRegistrado
        }
    });
         
});

//Método Put
app.put('/', async(req, res)=>{
    try {
        const _idUsuario = req.query._id;
        const strNombreUsuario = req.body.strNombreUsuario;
        if(!_idUsuario || _idUsuario.length != 24 ){
            return res.status(400).json({
                ok:false,
                msg: _idUsuario ? "El identificador no es válido, se requiere un id de 24 caracteres" : "No se recibió el identificador del usuario",
                cont:{
                    _idUsuario
                }
            });
        }

        const encontroUsuario = await usuarioModel.findOne({ _id:_idUsuario, blnEstado: true })
        if(!encontroUsuario){
            return res.status(400).json({
                ok:false,
                msg: "El usuario no se encuentra registrado en la base de datos",
                cont:{
                    _idUsuario
                }
            });
        }

        const encontroNombreDeUsuario = await usuarioModel.findOne({ strNombreUsuario:strNombreUsuario }, { strNombre:1, strApellido:1, strDomicilio:1 })
        console.log(strNombreUsuario);
        if(encontroNombreDeUsuario){
            return res.status(400).json({
                ok:false,
                msg: "El usuario ya se encuentra registrado en la base de datos",
                cont:{
                    encontroNombreDeUsuario
                }
            });
        }

        const actualizarUsuario = await usuarioModel.findByIdAndUpdate({_id:_idUsuario} , { $set: { strNombre: req.body.strNombre, strApellido:req.body.strApellido, strDireccion:req.body.strDireccion, strNombreUsuario:req.body.strNombreUsuario,idEmpresa:req.body.idEmpresa }}, { new:true } );

        return res.status(200).json({
            ok:true,
            msg:"El usuario se actualizó de manera exitosa",
            cont:{
              usuarioAnterior:encontroUsuario,
              usuarioActual:actualizarUsuario
            }
          });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:false,
            msg: error,
            cont:{
                _idUsuario
            }
        });
    }
});

//Método Delete
app.delete('/', async(req, res)=>{
    try{

        const _idUsuario = req.query._id;
        const blnEstado = req.query.blnEstado == "true" ? true: false;

        if(!_idUsuario || _idUsuario.length != 24){
            return res.status(400).json({
                ok:false,
                msg: _idUsuario ? "El identificador no es válido, se requiere un id de 24 caracteres" : "No se recibió el identificador del usuario",
                cont:{
                    _idUsuario: _idUsuario
                }
            });
        }

        if(!blnEstado){
            return res.status(400).json({
                ok:false,
                msg: _idUsuario ? "El blnEstado no es true or false" : "No se recibió el blnEstado",
                cont:{
                    blnEstado: blnEstado
                }
            });    
        }        

        const desactivarUsuario = await usuarioModel.findOneAndUpdate( { _id:_idUsuario }, {$set:{ blnEstado : blnEstado }}, { new:true });

        if(!desactivarUsuario){
            return res.status(400).json({
                ok:false,
                msg: "El usuario no se logró desactivar de la base de datos",
                cont:{
                    usuario: _idUsuario
                }
            });
        }
        return res.status(200).json({
            ok:true,
            msg: blnEstado ? "El usuario se activo de manera exitosa": "El usuario se desactivo de manera exitosa",
            cont:{
                desactivarUsuario
            }
        });

    }
    catch(error){
        return res.status(500).json({
            ok:false,
            msg: "Error en el servidor",
            cont:{
                error: error
            }
        }); 
    }
});

module.exports = app;