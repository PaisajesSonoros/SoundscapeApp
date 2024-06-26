/*
      MAIN FILE: Archivo principal y que ejecuta la aplicación.
      Author: Manuel Salcedo Alonso.
      DATE: 02/09/2022
*/

//-- Cargar el módulo de electron y módulo fs.
const { table } = require('console');
const electron = require('electron');
const fs = require('fs');

// Files names.
// const MAIN_JSON = "resources/plantillas/main.json";
// const MAIN_JSON_ZERO = "resources/plantillas/main_zero.json";

console.log("Arrancando electron...");

//-- Variable para acceder a la ventana principal
//-- Se pone aquí para que sea global al módulo principal
let win = null;

var quiz_name_actual = "";
//--Posición en el Array "Number_Completed_Quiz".
// Marca la posición en el array del cuestionario.
// Sirve para modificar el número de cuestionarios completados.
var position_number_completed_quiz = 0;

//-- Punto de entrada. En cuanto electron está listo,
//-- ejecuta esta función
electron.app.on('ready', () => {
    console.log("Evento Ready!");
    let icon_image_path;
    if (process.platform == "linux") {
      icon_image_path = '/images/icon.png';
    }else{
      icon_image_path = '/images/icon.ico'
    }
    //-- Crear la ventana principal de nuestra aplicación
    win = new electron.BrowserWindow({
        width: 1340,   //-- Anchura 
        height: 600,  //-- Altura
        icon: __dirname + icon_image_path,
        //-- Permitir que la ventana tenga ACCESO AL SISTEMA
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: false
        }
    });
  win.setMenuBarVisibility(true);
  //-- ¿Qué lenguaje se está usando? Leemos el JSON    
  // Leemos el archivo 'main.json'
  // const  MAIN_JSON_FILE = fs.readFileSync(MAIN_JSON);
  // Adaptamos el archivo JSON para que pueda tratar con él en JAVASCRIPT.
  // var main_info = JSON.parse(MAIN_JSON_FILE);
  // console.info(main_info["languaje"])
  //-- Cargar interfaz gráfica en HTML
  // win.loadFile("HTML/"+main_info["languaje"]+ "_html/index.html");
  win.loadFile("pages/spa/index.html")
});


// Esta función está en espera hasta que el cliente solicita el nombre del cuestionario
// actual. Así de esta manera el usuario puede continuar con el cuestionario realizado anteriormente.

// electron.ipcMain.handle('actual_quizs',(event, msg) => {
//   console.log("Nos piden el nombre del Quiz actual: " + msg);
//   // Leemos el archivo 'main.json'
//   const  MAIN_JSON_FILE = fs.readFileSync(MAIN_JSON);
//   // Adaptamos el archivo JSON para que pueda tratar con él en JAVASCRIPT.
//   var main_info = JSON.parse(MAIN_JSON_FILE);
//   //-- Extraemos el nombre del archivo actual para cuando lo usemos.
//   let quiz_name_actual = main_info["Quiz_actual"];
//   //-- Enviamos el nombre del quiz actual al archivo JAVASCRIPT correspondiente.
//   console.log("Enviamos: " + quiz_name_actual)
//   win.webContents.send('actual_quizs', quiz_name_actual);

// });


//-- Esperar a recibir los mensajes de botón apretado (Test) del proceso de 
//-- renderizado. Al recibirlos se escribe una cadena en la consola

// electron.ipcMain.handle('quizs',(event, msg) => {
//   console.log("Nos piden los nombres de los quizs ya creados: " + msg);
//   const  MAIN_JSON_FILE = fs.readFileSync(MAIN_JSON);
//   var main_info = JSON.parse(MAIN_JSON_FILE);
//   //-- Guardamos el nombre del archivo para cuando lo usemos.
//   let quizs_names = main_info["Quizs_Names"];
//   console.log("Enviamos: " + quizs_names)
//   win.webContents.send('quizs', quizs_names);

// });

// electron.ipcMain.handle('refresh_quiz_actual_name',(event, msg) => {
//   quiz_name_actual = msg;
//   console.log("El nombre del Quiz actualizado es: " + quiz_name_actual);
//   const  MAIN_JSON_FILE = fs.readFileSync(MAIN_JSON);
//   var main_info = JSON.parse(MAIN_JSON_FILE);
//   main_info["Quiz_actual"]= quiz_name_actual;
//   let myJSON = JSON.stringify(main_info);
//   fs.writeFileSync(MAIN_JSON,myJSON);
// });

// electron.ipcMain.handle('test', (event, msg) => {
//   console.log("El nombre del quiz nuevo creado es: " + msg.split("/")[2]);
//   const  MAIN_JSON_FILE = fs.readFileSync(MAIN_JSON);
//   var main_info = JSON.parse(MAIN_JSON_FILE);
//   //-- Guardamos el nombre del archivo para cuando lo usemos.
//   msg = msg.split("/")[2];
//   //-- Buscamos en el array de nombres si está en la lista
//   if (main_info["Quizs_Names"].includes(msg) == false) {
//     // Si entra aquí es que el valor NO está en la lista y por tanto se guarda.
//     main_info["Quizs_Names"].push(msg);
//     main_info["Number_Completed_Quiz"].push(0);
//     main_info["Number_Quizs"] = main_info["Quizs_Names"].length;
//   }else{
//     // Si existe se va a resetear lo que tenga, por tanto se resetea el número de quiz realizados.
//     for (let i = 0; i < main_info["Number_Completed_Quiz"].length; i++) {
//       // Como se ha cambiado el nombre del Cuestionario se actualiza el nombre.
//       if (main_info["Quizs_Names"][i] == quiz_name_actual) {
//          position_number_completed_quiz = i;
//       } 
//     }
//     main_info["Number_Completed_Quiz"][position_number_completed_quiz] = 0;
//     console.log("El archivo ya existia");
//   }
//   let myJSON = JSON.stringify(main_info);
//   fs.writeFileSync(MAIN_JSON,myJSON);
// });


//-- Guarda los Cuestionarios rellenados por el cliente.
// electron.ipcMain.handle('completed_quiz', (event, msg) => {
//   console.log("Cuestionario Terminado, se procede a guardarlo");
//   // Lo primero es modificar el nombre del nombre del Quiz Actual en el JSON.
//   console.log("Cargamos el main.json");
//   const  MAIN_JSON_FILE = fs.readFileSync(MAIN_JSON);
//   var main_info = JSON.parse(MAIN_JSON_FILE);
//   console.log("El nombre del quiz actual para la APP es: '" + quiz_name_actual + "'");
//   console.log("El nombre del quiz actual para el main.json es: '" + main_info["Quiz_actual"] + "'");
//   //-- Si el nombre recibido es igual al que tiene el main ya se suma uno el valor.
//   if (quiz_name_actual == main_info["Quiz_actual"]) {
//     for (let i = 0; i < main_info["Number_Quizs"]; i++) {
//       // Como se ha cambiado el nombre del Cuestionario se actualiza el nombre.
//       console.log("El nombre a comparar es:"+main_info["Quizs_Names"][i]);
//       console.log("El nombre del quiz actual es: "+quiz_name_actual)
//       if (main_info["Quizs_Names"][i] == quiz_name_actual) {
//          position_number_completed_quiz = i;
//       } 
//     }
//     main_info["Number_Completed_Quiz"][position_number_completed_quiz] += 1;
    
//   }else{
//     main_info["Quiz_actual"] = quiz_name_actual;
//     console.log("El Quiz actual es " + main_info["Quiz_actual"])
//     // Si el usuario ha cambiado el nombre se cambiará el nombre del Quiz operativo actual.
//     for (let i = 0; i < main_info["Number_Quiz"]; i++) {
//       // Si el nombre actual encaja con el nombre de que tiene la posición del array se guarda esa posición.
//       console.log("Buscar hasta que salga:"+quiz_name_actual)
//            if (main_info["Quiz_Names"][i] == quiz_name_actual) {
//             // La variable de abajo marca la posición en el array del número de Cuestionarios completados.
//               position_number_completed_quiz = i;
//               // Sumamos uno al número de quiz completados puesto que se ha cerrado el custionario. 
//               main_info["Number_Completed_Quiz"][i] += 1;
//            } 
//     }
//   }
//   console.log("El numero de Quiz Completados es: " + main_info["Number_Completed_Quiz"][position_number_completed_quiz])
//   //-- Ahora guardaremos en un fichero los resultados del cuestionario.
//   //-- Lo primero que tenemos que saber es si existe o no el fichero de guardado general.
//   //-- Para saberlo miraremos si el número de cuestionarios creados es 1 o es mayor. 
//   // Si es 1 implica que es el primero y hay que crear el archivo.
//   // Si es mayor de 1 implica que ya hay un archivo creado y por tanto se puede leer y escribir en el.
//   var save_file;

//   if (main_info["Number_Completed_Quiz"][position_number_completed_quiz] == 1) {
//     // Creamos el fichero.
//     save_file = [];
//     save_file[0] = msg;
//   }else{
//     const SAVE_JSON = "resources/quiz_savings/"+ quiz_name_actual;
//     const  SAVE_JSON_FILE = fs.readFileSync(SAVE_JSON);
//     save_file = JSON.parse(SAVE_JSON_FILE);
//     // Se añade el último cuestionario realizado a la lista.
//     save_file.push(msg);

//   }
//   const SAVE_JSON = "resources/quiz_savings/"+ quiz_name_actual;
//   let myJSON = JSON.stringify(save_file);
//   fs.writeFileSync(SAVE_JSON,myJSON);
//   //-- Guardamos en el JSON Principal la información.
//   myJSON = JSON.stringify(main_info);
//   fs.writeFileSync(MAIN_JSON,myJSON);
// });

//-- Envía al cliente la lista de cuestionarios que poseen resultados.
// electron.ipcMain.handle('load_quizs_opened',(event, msg) => {
//   console.log("Nos piden los nombres de los quizs que se han usado: " + msg);
//   const  MAIN_JSON_FILE = fs.readFileSync(MAIN_JSON);
//   var main_info = JSON.parse(MAIN_JSON_FILE);
//   //-- Para saber si el cuestionario se ha realizado al menos una vez es necesario ver 
//   // la variable "Number_Completed_Quiz".
//   let number_completed_quiz = main_info["Number_Completed_Quiz"];
//   for (let i = 0; i < number_completed_quiz.length; i++) {
//     //-- Si es distinto de cero es porque se ha usado al menos una vez.
//     if (number_completed_quiz[i] != 0) {
//       //-- Nos quedamos con el nombre del Cuestionario que fue usado al menos una vez.
//       msg.push(main_info["Quizs_Names"][i]);
//     }    
//   }
  
//   console.log("Enviamos los nombres de los quizs buenos: " + msg)
//   win.webContents.send('load_quizs_opened', msg);
// });

//-- Envía todos los resultados del Cuestionario con el nombre del mensaje.
// electron.ipcMain.handle('quizs_summary',(event, msg) => {
//   console.log("Nos piden los resultados del cuestionario con nombre: " + msg);
//   const SUMMARY_JSON = "resources/quiz_savings/" + msg;
//   const  SUMMARY_JSON_FILE = fs.readFileSync(SUMMARY_JSON);
//   var summary_info = JSON.parse(SUMMARY_JSON_FILE);
//   console.log("Enviamos los resultados de ese Quiz: " + summary_info)
//   win.webContents.send('quizs_summary', summary_info);
// });

//-- Enviamos si el modo root está activado o no.
// electron.ipcMain.handle('root_activated_mode',(event, msg) => {
//   const  MAIN_JSON_FILE = fs.readFileSync(MAIN_JSON);
//   var main_info = JSON.parse(MAIN_JSON_FILE);
//   msg = main_info["root_mode"]
//   win.webContents.send('root_activated_mode', msg);
// });

// electron.ipcMain.handle('online_quiz_save',(event,msg) =>{
//   //-- Abrimos la información del main.
//   const MAIN_JSON_FILE = fs.readFileSync(MAIN_JSON);
//   var main_info = JSON.parse(MAIN_JSON_FILE);
//   //-- Añadimos en la información del main la información actual.
//   var quiz_json = msg;

//   //-- Añadimos en el array que guarda los nombres del cuestionario el nuevo nombre.
//   //-- Si ese nombre ya está asignado, se debe resetear y sobreescribir.
//   let name_quiz = quiz_json["Name_Quiz"];
//   if (main_info["Quizs_Names"].indexOf(name_quiz) == -1) {
//       //-- Sumamos uno al número de Cuestionarios creados.
//       main_info["Number_Quizs"] += 1;
//       main_info["Quizs_Names"].push(name_quiz+".json");
//   }
//   main_info["Number_Completed_Quiz"].push(0)
//   //-- Colocamos como cuestionario actual el nuevo cuestionario.
//   main_info["Quiz_actual"] = name_quiz;
//   //-- Guardamos la información del main en el main.json
//   //-- Guardamos en el JSON Principal la información.
//   myJSON = JSON.stringify(main_info);
//   fs.writeFileSync(MAIN_JSON,myJSON);
//   //-- Después de actualizar la información del main, guardamos el cuestionario, de forma que el usuario 
//   //-- ya no tenga que volver a descargarlo.
//   myJSON = JSON.stringify(quiz_json);
//   const QUIZ_FILE = "resources/quiz_files/"+name_quiz+".json";
//   fs.writeFileSync(QUIZ_FILE,myJSON)
//   console.log(QUIZ_FILE)
//   //-- Informamos al usuario que todo el main.js ha guardado y preparado todo para realizar el cuestionario.
//   //-- Enviamos la posición en el array.
//   win.webContents.send('online_quiz_save',name_quiz+'.json')
// });
