const express = require('express');
const app = express.Router();
const usuarioModel = require('../../models/usuario/usuario.model');

//Método get
app.get('/',  async (req, res) => {

const obtenerUsuarios =  await usuarioModel.find();
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
    const body = req.body;
    const obtenerUsuario = await usuarioModel.find({ strCorreo:body.strEmail });
    
    if(obtenerUsuario.length > 0)
    {
        return res.status(200).json({
            ok:false,
            msg:"El usuario no se registro debido a que ya existe",
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


module.exports = app;