const mongoose = require("mongoose");

let SchemaProducto = mongoose.Schema({
    strNombre:{
        type:String,
        required : [true, "No se recibió el strNombre"]
    },
    strDescripcion:{
        type:String,
    required:[true, "No se recibió el strDescripción"]
    },
    nmbPrecio:{
        type:Number,
        required:[true, "No se recibió nmbPrecios"]
    }
});

module.exports = mongoose.model('producto', SchemaProducto);