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
    strContrasena:{
        type:String,
        required:[true, "No se recibió strContrasena"]
    },
    strNombreUsuario:{
        type:String,
        required:[true, "No se recibió strNombreUsuario"]
    },
    blnEstado:{
        type:Boolean,
        default:true
    },
    idEmpresa:{
        type:mongoose.Types.ObjectId,
        required:[true, "No se recibió el idEmpresa"]
    }
});

module.exports = mongoose.model('usuario', SchemaUsuario);