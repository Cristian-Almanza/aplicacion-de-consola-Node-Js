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

    borrarTarea(id=''){
        if(this._listado[id]){
            delete this._listado[id];
        }
    }

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

        // emplea el get listadoArr que ya contiene un arreglo de objetos
        // con el foreach recorre cada tarea
        this.listadoArr.forEach((tarea,i)=>{
            // crea un template string con el indice del foreach
            const idx= `${i+1}`.green;
            // destructura la tarea y obtenemos la descripcion y si el comEn
            const { desc, comEn}=tarea;
            // El estado se obtiene mediante un ternario, el cual determina si el resultado es nul o no
            const estado=(comEn)
                            ? 'Completado'.green
                            :  'Pendiente'.red;
            // Unie todo en un template string para obtener la salida
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
    };

    // Metodo para listar las tareas completadas o pendientes segun el argumento recibido
    // tiene la limas logica que listarTareas
    listarPendientesCompletadas(completadas=true){
        let contador=0;
        this.listadoArr.forEach((tarea)=>{
            const { desc, comEn}=tarea;
            // si completadas es true
            if(completadas){
                // y el comEn diferente de null
                if( comEn!==null){
                    contador+=1;
                    // imprime las tareas completadas
                    console.log(`${contador.toString().green} ${desc} :: ${comEn.green}`);
                };
            }
            // mismo funcionamiento pero para tareas incompletas
            else{
                if(comEn==null){
                    contador+=1;
                    console.log(`${contador.toString().green} ${desc} :: ${'Pendiente'.red}`);
                }
            };             
        });
    };

    // funcion que cambia el valor de las tareas por completado o nul segun se rquiera
    toggleCompletadas(ids=[]){

        // recibe un arreglo de ids de las tareas, para cada id pregunta si su estado es distinto de null,
        ids.forEach(id=>{
            const tarea = this._listado[id];
            // si es asi, coloca la fecha del sistema en la cual se completo la tarea
            if(!tarea.comEn){
                tarea.comEn=new Date().toISOString();
            }
        });
        // caso contrario, si no esta completada, coloca null en el campo de comEn
        this.listadoArr.forEach(tarea =>{
            if(!ids.includes(tarea.id)){
                this._listado[tarea.id].comEn=null;
            };
        });
    }
};


module.exports=Tareas;