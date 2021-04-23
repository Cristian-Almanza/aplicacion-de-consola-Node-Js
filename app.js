
require('colors');

const { guardarDB, leerDB } = require('./helpers/guardarA');
const { inquirerMenu, pausa, leerInput  } = require('./helpers/inquirer');
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
                // guardar tarea
                guardarDB(tareas.listadoArr);
            break;
            case '2':
                console.log(tareas.listadoArr);
            break;
            case '3':
                tareas.listadoCompleto();
            break;
            
        }

       

        await pausa();
    }while(opt!=='0');
    
};


main();