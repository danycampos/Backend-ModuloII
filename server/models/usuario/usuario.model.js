const mongoose = require("mongoose");

let SchemaUsuario = mongoose.Schema({
    strNombre:{
        type:String,
        required : [true, "No se recibió el strNombre"]
    },
    strApellido:{
        type:String,
    required:[true, "No se recibió el strApellido"]
    },
    strDireccion:{
        type:String,
        required:[true, "No se recibió strDireccion"]
    },
    strEmail:{
        type:String,
        required:[true, "No se recibió strEmail"]
    },
    strContraseña:{
        type:String,
        required:[true, "No se recibió strContraseña"]
    }
});

module.exports = mongoose.model('usuario', SchemaUsuario);