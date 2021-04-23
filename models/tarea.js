// clase que sirve para crear las instancias de nuevas tareas, es el cuerpo 
// uuid es un paquete que permite crear identificadores unicos a nivel mundial
// npm instal uuid
const {v4:uuidv4} = require('uuid');

class Tarea{
    id='';
    desc='';
    comEn=null;

    // se ejecutara al crear una instancia de la tara
    constructor(desc){
        this.id=uuidv4();
        this.desc=desc; // this hace referencia a la instancia de la clase y se iguala a la descripcion recibida mediante el argumento
        this.comEn=null;
    }
};

module.exports=Tarea;