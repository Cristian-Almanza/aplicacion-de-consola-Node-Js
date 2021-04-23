require('colors');

const mostrarMenu=()=>{
    return new Promise(resolve=>{
        console.clear();
        console.log('============================'.green);
        console.log('    Seleccione una opcion   '.white);
        console.log('============================\n'.green);
    
        console.log(`1. Crear tarea`);
        console.log(`2. Listar tarea`);
        console.log(`3. Listar tareas completadas`);
        console.log(`4. Completar tarea(s)`);
        console.log(`5. Borrar tarea`);
        console.log(`0. Salir\n`);
    
        const readline=require('readline').createInterface({
            input:process.stdin,
            output: process.stdout
        });
    
        readline.question('Seleccione una opcion: ', (opt)=>{
            readline.close();
            resolve(opt);
        });
    });
};

const pausa=()=>{
    return new Promise(resolve=>{
        const readline=require('readline').createInterface({
            input:process.stdin,
            output: process.stdout
        });
    
        readline.question(`\nPresione ${'Enter'.green} para continuar`, opt=>{
            readline.close();
            resolve(opt);
        });
    });
};

module.exports={
    mostrarMenu,
    pausa
};








