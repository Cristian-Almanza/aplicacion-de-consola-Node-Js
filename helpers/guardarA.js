// paquete para manipular archivos 
const fs=require('fs'); 

 // variable con la ubicacion de mi archivo, si no existe lo crea
 const archivo='./db/data.json';

// Funcion que permite guardar los datos en un json
const guardarDB=(data)=>{

    // metodo donde se guarda los datos, el JSON.stringify convierte un objeto a su version JSON como string
    fs.writeFileSync(archivo,JSON.stringify(data));
};

// Funcion para leer los datos del json o txt
const leerDB=()=>{

    // condicion, si el archivo no existe retorna null
    // fs.existSync: requiere el part para verificar si existe o no
    if(!fs.existsSync(archivo)){
        return null;
    };

    // si existe, almacenaremos los datos en la vriable info
    // el archivo se lee mediante fs.readFileSync(path, { encoding:'utf-8'}), el econding utf-8 para acentos y otros caracteres 
    const info = fs.readFileSync(archivo, {encoding: 'utf-8'});

    // variable que guarda los objetos de la info, mediante el JSON.parse que revierte el string a objeto
    const data=JSON.parse(info);

    //console.log(data);

    return data;
};

module.exports={
    guardarDB,
    leerDB
}