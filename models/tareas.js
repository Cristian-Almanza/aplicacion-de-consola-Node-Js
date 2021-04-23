// Clase Tareas que permite manejar muchas tareas a la ves.
const Tarea = require("./tarea");

/*
ojeto _listado, contendra el uuid que apunta a una tarea especifica
_listado: {'uuid:1235462-1546e4-2: { id: 12, desc:'hola', comEn:null} }
Si se necesita buscar algo con el if, hacemos referencia al listado para encontrarlo
*/

class Tareas{
    // listado de tareas para localizarlas 
    _listado={}; 

    // metodo get para obtener un arreglo a partir del listado de objetos
    get listadoArr(){

        //variable de tipo arreglo para almacenar las tarea en un arreglo
        const listado=[];

        // Object extrae cada una de las llaves en un objeto, en este caso el listado y retorna un arreglo
        // Como es ahora es un arreglo, ya se pueden usar metodos como el foreach o el push
        Object.keys(this._listado).forEach(key => {

            // la tarea es igual al onjeto en el arreglo con dicha id (key)
            const tarea = this._listado[key];

            // insertamos cada tarea en el arreglo
            listado.push(tarea);
        });

        // retornamos el arreglo
        return listado;
    };

    constructor(){
    // inicializamos el listado como un objeto vacio
        this._listado={}; 
    };

    // metodo que carga las tareas al objeto _listado
    cargarTareasFromArray(tareas=[]){

        tareas.forEach(tarea=>{
            this._listado[tarea.id]=tarea;
        });
    };

    // metodo para crear tareas, recibe al menos la descripcion
    crearTarea(desc=''){

        // instancia de la clase Tarea, para manejar la creacion de nuevas tareas
        const tarea = new Tarea(desc);

        // Para hacer referencia a una propiedad del objeto lo ponemos entre corchetes
        // hacemos referencia al id de uuid que apunta a la instancia de la clase tarea
        this._listado[tarea.id] = tarea;
    };

    //metodo para listar tareas completadas o inconclusas
    listadoCompleto(){

        //Metodo de Fernando Herrera

        this.listadoArr.forEach((tarea,i)=>{
            const idx= `${i+1}`.green;
            const { desc, comEn}=tarea;
            const estado=(comEn)
                            ? 'Completado'.green
                            :  'Pendiente'.red;
            console.log(`${idx} ${desc} :: ${estado}`);

        });

        /* Mi metodo
        let i=1; 
        this.listadoArr.forEach(tarea=>{

            if(tarea.comEn!==null){
                i.toString();
                console.log(i+`. ${tarea.desc} :: ${'Completada'.green}`);
            }
            else{
                console.log(i+`. ${tarea.desc} :: ${'Pendiente'.red}`);
            } 
            i++;
        });*/
    }
};

module.exports=Tareas;