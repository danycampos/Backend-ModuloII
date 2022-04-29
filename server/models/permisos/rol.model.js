const mongoose = require("mongoose");

let SchemaRol = mongoose.Schema({
    strNombre : {
        type:String,
        required:[true, "Se requiere strNombre"]
    },
    strDescripcion:{
        type:String,
        required:[true, "Se requiere strDescripcion"]
    },
    arrObjIdApis:{
        type:Array,
        required:[true, "Se requiere arrObjIdApis"]
    }

});

module.exports = mongoose.model('Rol', SchemaRol);