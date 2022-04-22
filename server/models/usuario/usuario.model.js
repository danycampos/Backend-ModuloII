const mongoose = require("mongoose");

let SchemaUsuario = mongoose.Schema({
    strNombre:{
        type:String,
        required : [true, "No se recibió el strNombre"]
    },
    strApellidos:{
        type:String,
    required:[true, "No se recibió el strApellidos"]
    },
    strDireccion:{
        type:String,
        required:[true, "No se recibió strDireccion"]
    }
});

module.exports = mongoose.model('usuario', SchemaUsuario);