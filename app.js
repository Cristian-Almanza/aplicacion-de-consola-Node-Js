
require('colors');

const inquirer = require('inquirer');
const { guardarDB, leerDB } = require('./helpers/guardarA');
const { inquirerMenu, pausa, leerInput ,listadoTareasBorrar, confirmar, mostrarListadoChecklist } = require('./helpers/inquirer');
const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');
//const { mostrarMenu, pausa } = require('./helpers/mensajes');

console.clear();

// funcion sincrona para el programa
const main= async()=>{
    
    // variable para almacenar las opciones
    let opt='';

    // instancia de la clase tareas
    const tareas = new Tareas();
    // variable para almacenar los datos que se llena desde la db
    const tareasDB=leerDB();

    // si los datos existe, se cargan las tareas al arreglo de la clase Tareas
    if(tareasDB){
        tareas.cargarTareasFromArray(tareasDB);
    };
    
    
    // ciclo para repetirn el menu de forma infinita
    do{

        opt = await inquirerMenu();
        
        // switch que recibe el valor opt y ejecuta el codigo para cada casp
        switch(opt){
            case '1':
                // crear tarea
                const desc = await leerInput('Descripcion: ');
                // instancia de tarea
                tareas.crearTarea(desc);
            break;
            case '2':
                // llama el metodo para listar todas las tareas
                tareas.listadoCompleto();
            break;
            case '3':
                tareas.listarPendientesCompletadas(true);
            break;
            case '4':
                tareas.listarPendientesCompletadas(false);
            break;
            case'5':

                const ids = await mostrarListadoChecklist(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
            break;
            case '6':
                //tomamos el id de la tarea a borrar medinte la funcion
                const id =  await listadoTareasBorrar(tareas.listadoArr);
                
                if(id!=='0'){
                    // preguntamos si se eleminiara
                    const ok=await confirmar('¿Estas seguro?');
                    // en caso de ser correcto llamamos la funcion borrar
                    if(ok){
                        tareas.borrarTarea(id);
                        console.log('Tarea Borrada!');
                    };
                };
            break;
            
        }

        // guardar tareas existentes en el arreglo listador
        guardarDB(tareas.listadoArr);

        await pausa();
    }while(opt!=='0');
    
};


main();