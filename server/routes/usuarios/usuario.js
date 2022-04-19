const express = require('express');
const app = express.Router();
let arrJsnUsuarios = [{ _id: 1, strNombre: '', strApellido:'',strEmail:''}]
const path = require('path');
const rutaDescarga = path.resolve(__dirname,'../../assets/index.html');

app.get('/', (req, res)=>{
    const arrUsuarios= arrJsnUsuarios;
    return res.status(200).json({
       ok:true,
       msg:'Se recibierón los usuarios de manera exitosa',
        cont:{
           arrUsuarios
        }
    })

    //console.log(rutaDescarga);
   //return res.download('index.html',rutaDescarga);

})

app.post('/', (req, res)=>{
    //const strNombre =  { strNombre : req.body.strNombre};
    // const strApellido = {strApellido : req.body.strApellido};
    // const strEmail =  req.body.strEmail;
    // const _id =  req.body._id;
    //console.log(strNombre, strApellido, strEmail, _id);

    const body = { strNombre : req.body.strNombre, 
            strApellido : req.body.strApellido, 
            strEmail: req.body.strEmail, 
            _id:parseInt(req.body._id) };
     
    if(typeof body.strNombre == "undefined" || typeof body.strApellido == "undefined" || typeof body.strEmail == "undefined" || typeof body._id == "undefined" ){
        console.log("No se permiten valore vacíos, los datos no se guardaran");
        return;
    }

    const existe = arrJsnUsuarios.find(item => item._id == body._id);  

    console.log(typeof existe, existe);
    if(typeof existe != "object")
    {
        console.log("entro en push");

            arrJsnUsuarios.push(body);
            res.status(200).json({
            ok:true,
            msg:"Se registro el usuario de manera correcta",
            count:{
                arrJsnUsuarios
            }
        });
        console.log(arrJsnUsuarios);
    }
    else{
            res.status(200).json({
            ok:false,
            msg:"El usuario ya existe, no se grabará",
            count:{
                body
            }
        });
        }
    
});

app.put('/', (req, res)=>{
    const _idUsuario = parseInt(req.query._idUsuario);
    const existe = arrJsnUsuarios.find(item => item._id === _idUsuario);  

        if(_idUsuario){
            if(existe)
            {
                const nuevoUsuario = {
                    strNombre : req.body.strNombre, 
                    strApellido : req.body.strApellido, 
                    strEmail: req.body.strEmail, 
                    _id:_idUsuario
                }

                const filtrarUsuario = arrJsnUsuarios.filter(usuario => usuario._id != _idUsuario);
                arrJsnUsuarios = filtrarUsuario;
                arrJsnUsuarios.push(nuevoUsuario);
                console.log(arrJsnUsuarios);
            
            res.status(200).json({
                ok:true,
                msg:"Se actualizó de manera exitosa el usuario " + _idUsuario
            });
        }
        else{
            res.status(200).json({
                ok:false,
                msg:"El identificador del usuairo no existe",
                cont:{
                    _idUsuario
                }
            });
        }
    }
    else{
        res.status(200).json({
            ok:false,
            msg:"El identificador del usuairo no existe",
            cont:{
                _idUsuario
            }
        });
    }
});

app.delete('/', (req, res)=>{
    const _idUsuario = parseInt(req.query._idUsuario);
     

        if(_idUsuario){
            const existe = arrJsnUsuarios.find(item => item._id === _idUsuario); 
            if(existe)
            {
                const filtrarUsuario = arrJsnUsuarios.filter(usuario => usuario._id != _idUsuario);
                arrJsnUsuarios = filtrarUsuario;                
                console.log(arrJsnUsuarios);
            
           return res.status(200).json({
                ok:true,
                msg:"Se eliminó de manera exitosa el usuario " + _idUsuario
            });
        }
        else{
            res.status(200).json({
                ok:false,
                msg:"El identificador del usuairo no existe",
                cont:{
                    _idUsuario
                }
            });
        }
    }
    else{
      return  res.status(200).json({
            ok:false,
            msg:"El identificador del usuairo no existe",
            cont:{
                _idUsuario
            }
        });
    }
});
module.exports = app;gt 