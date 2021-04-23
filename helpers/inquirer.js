const inquirer = require('inquirer'); // paquete nepm que permite trabajar con la consola
const { validate } = require('uuid');

// Arreglo con el que se puede trabajar el prompt de inquirer
// se muestra tal cual debe de ser
const preguntas=[
    {
        type:'list',
        name:'opcion',
        message:'¿Que desea hacer?',
        choices: [
            {
                value: '1',
                name:`${'1.'.green} Crear tarea`
            },
            {
                value: '2',
                name:`${'2.'.green} Listar tareas`
            },
            {
                value: '3',
                name:`${'3.'.green} Listar tareas completadas`
            },
            {
                value: '4',
                name:`${'4.'.green} Listar tareas pendientes`
            },
            {
                value: '5',
                name:`${'5.'.green} Completar tarea(s)`
            },
            {
                value: '6',
                name:`${'6.'.green} Borrar tarea`
            },
            {
                value: '0',
                name:`${'0.'.green} Salir`
            }
        ]
    }
];

const inquirerMenu=async()=>{
    console.clear();
    console.log('============================'.green);
    console.log('    Seleccione una opción   '.white);
    console.log('============================\n'.green);

    // opt guarda el valor del prompt de inquirer, recibe el arreglo con la opciones
    const {opcion} = await inquirer.prompt(preguntas);
    
    return opcion;

};

const pausa=async()=>{
    const question=[
        {
            type:'input',
            name:'opcion',
            message:`Presione ${'Enter'.green} para continuar`

        }
    ];
    
    console.log('\n');
    await inquirer.prompt(question);
    
};

// funcion para que el usuario escriba el argumento de lo que quiere hacer
const leerInput = async( mensaje) =>{
    // arreglo para el inquirer.promt
    const question = [
        {
            // de tipo input para leer lo que el usuario escriba
            type:'input',
            // nombre para saber que es la descripcion
            name: 'desc',
            // recibe un mensaje del usuario
            message: mensaje,
            // valida si se ha escrito algo o esta vacio el mensaje
            validate(value){
                if(value.length==0){
                    // si esta vacio retorna que insgrese un valor
                    return 'Error'.red + ' Ingrese un valor';
                }
                // caso contrario solo retorna true indicando que esta bien
                return true;
            }
        }
    ];

    // ya que el inquirer retorna un objeto, lo destructuramos para obtener la descripcion de la tarea
    const {desc}= await inquirer.prompt(question);

    // retornamos la opcion del usuario
    return desc;
};


// Metodo que hace una lista de las tareas para poder borrar alguna
const listadoTareasBorrar= async(tareas=[])=>{
    
    // creamos una constancte choices con map, que lo que hace es devolver un nuevo arreglo con
    // pero transformando los items del arreglo treas al valor que uno decee, en este caso el objeto en el return
    const choices=tareas.map((tarea, i )=>{
        const idx= `${i+1}`.green;
        return{
            value:tarea.id,
            name:`${idx} ${tarea.desc}`

        }
    }); 

    // con esto podemos agregar otra opcion al arreglo choices
    choices.unshift(
        {
            value:'0',
            name:'0.'.green + 'Cancelar'
        }
    );

    // arreglo para el prompt de inquirer que permite desplegar las tareas como un menu
    // sera de tipo lista, el nombre es el id de la tarea, y en la choices estaran las opciones creadas con map
    const preguntas=[{
        type:'list',
        name:'id',
        message:'Borrar',
        choices // choices apunta al arreglo choices, por lo que en EC6 esto solo se deja un choices
    }];
    const {id} = await inquirer.prompt(preguntas);
    return id;
    
};

// funcion que pregunta al usuario si decea eliminar una tarea
// mediante el type: confirm de inquirer
const confirmar=async(message)=>{
    const question=[
        {
            type:'confirm',
            name:'ok',
            message
        }
    ];
    const {ok} = await inquirer.prompt(question);
    return ok;


};

// funciona de manera similar al listadoBorrar, solo que aqui se emplea el metodo checked en las opciones y se maneja el tipo checkbox
const mostrarListadoChecklist= async(tareas=[])=>{
    
    const choices=tareas.map((tarea, i )=>{
        const idx= `${i+1}`.green;
        return{
            value:tarea.id,
            name:`${idx} ${tarea.desc}`,
            checked: (tarea.comEn) ? true : false // si es null, coloca false, cualquier otra cos sera true
        }
    }); 

    const pregunta=[{
        type:'checkbox',
        name:'ids',
        message:'Selecciones',
        choices 
    }];
    const {ids} = await inquirer.prompt(pregunta);
    return ids;
    
};



module.exports={
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist
};