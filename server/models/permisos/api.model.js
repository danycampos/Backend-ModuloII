const mongoose = require("mongoose");

let SchemaApi = mongoose.Schema({
    blnEstado : {
        type:Boolean,
        default:true,
        required:[true, "Se requiere blnEstado"]
    },
    strRuta:{
        type:String,
        required:[true, "Se requiere strRuta"]
    },
    strMetodo:{
        type:String,
        required:[true, "Se requiere strMetodo"]
    },
    strDescripcion:{
        type:String,
        requiered:[true, "Se requiere strDescripcion"]
    },
    blnEsApi:{
        type:Boolean,
        default:true
    },
    blnEsMenu:{
        type:Boolean,
        default:false
        },
    blnRolDefault:{
        type:Boolean,
        default:false
    }

});

module.exports = mongoose.model('Api', SchemaApi);