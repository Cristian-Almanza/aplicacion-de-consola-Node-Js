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
  

module.exports={
    inquirerMenu,
    pausa,
    leerInput
};