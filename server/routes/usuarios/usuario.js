const express = require('express');
const app = express.Router();
const bcrypt = require('bcrypt');
const usuarioModel = require('../../models/usuario/usuario.model');

//Método get
app.get('/',  async (req, res) => {

const obtenerUsuarios =  await usuarioModel.find({},{ strContrasena:0 });
console.log(obtenerUsuarios);

if(obtenerUsuarios.length > 0)
{
    return res.status(200).json({
        ok:true,
        msg:"Se conectó al metódo get de usuarios",
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
    
    if(encontroEmail.length > 0 )
    {
        return res.status(200).json({
            ok:false,
            msg:"El usuario no se registro debido a que ya existe el email",
            cont:{
                obtenerUsuario
            }
        });

    }

    if(encontroNombreUsuario.length > 0 )
    {
        return res.status(200).json({
            ok:false,
            msg:"El usuario no se registro debido a que ya existe el nombre de usuario",
            cont:{
                obtenerUsuario
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

app.put('/', async(req, res)=>{
    try {
        const _idUsuario = req.query._id;
        if(!_idUsuario || _idUsuario.length != 24 ){
            return res.status(400).json({
                ok:false,
                msg: _idUsuario ? "El identificador no es válido, se requiere un id de 24 caracteres" : "No se recibió el identificador del usuario",
                cont:{
                    _idUsuario
                }
            });
        }

        const encontroUsuario = await usuarioModel.findOne({ _id:_idUsuario })
        if(!encontroUsuario){
            return res.status(400).json({
                ok:false,
                msg: "El usuario no se encuentra registrado en la base de datos",
                cont:{
                    _idUsuario
                }
            });
        }

        const encontroNombreDeUsuario = await usuarioModel.findOne({ strNombreUsuario:strNombreUsuario, _id:{ $ne: _idUsuario } }, { strNombre:1, strApellido:1, strDomicilio:1 })
        if(encontroUsuario){
            return res.status(400).json({
                ok:false,
                msg: "El usuario ya se encuentra registrado en la base de datos",
                cont:{
                    encontroNombreDeUsuario
                }
            });
        }


        const actualizarUsuario = await usuarioModel.findByIdAndUpdate(_idUsuario , { $set: { strNombre: req.body.strNombre, strApellido:req.body.strApellido, strDireccion:req.body.strDireccion }}, { new:true } );

        return res.status(200).json({
            ok:true,
            msg:"El usuario se actualizó de manera exitosa",
            cont:{
              usuarioAnterior:encontroUsuario,
              usuarioActual:req.body
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

module.exports = app;