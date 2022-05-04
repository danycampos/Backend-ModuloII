const mongoose = require("mongoose");

let SchemaEmpresa = mongoose.Schema({
    strNombre:{
        type:String,
        required : [true, "No se recibió el strNombre"]
    },
    strDescripcion:{
        type:String,
    required:[true, "No se recibió el strDescripción"]
    },
    nmbTelefono:{
        type:String,
        required:[true, "No se recibió nmbTelefono"]
    },
    blnEstado:{
        type:Boolean,
        default:true
    },
    nmbCodigoPostal:{
        type:Number
    },
    strCiudad:{
        type:String
    }
});

module.exports = mongoose.model('empresa', SchemaEmpresa);