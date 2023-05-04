let tareas = []; //armo variable let(aceptara cambios) que conntedra un array vacio y recibira como elementos las tareas, los elementos seran objetos.

const form = document.querySelector('form'); //captura la etiqueta form que contiene el formulario

//-----------------------manejo de formulario / creación de tarea (create - post) / guardado en localStorage---------------------------------------
form.addEventListener('submit', (event) => { //pongo a "escuchar" al form el evento submit (cuando se  envia el formulario a traves del boton - type "submit")
    event.preventDefault(); //prevengo el comportamiento por defecto del form (envio de datos y recarga de pagina)

    const inputText = document.querySelector("#text"); //capturo input con id "text", lo asigno a la variable inputText
    const inputId = document.querySelector("#id"); //capturo input con id "id", lo asigno a la variable inputId

    console.log(inputId.value)

    if(inputId.value) { // establezco un condicional if - condición (si hay valor de inputI hace el forEach, por default arranca en vacio - falso)
        tareas.forEach(tarea => { //recorre a tareas y por cada elemento (tarea) establece una condicion ()
            if(tarea.id == inputText.value) { //si el id de tarea es igual al valor de inputText
                tarea.text = inputText.value; //asigno el valor de inputText a la clave text de tarea (es un objeto)
            }
         });
    } else {
       tareas.push({ //le envia a tareas(array) un objeto 
           id: Date.now(),
           text: inputText.value,
           complete: false,
       });
    }

    localStorage.setItem("tareas", JSON.stringify(tareas)); //envia tareas(array) al localStorage. el array de objetos se transforma a formato string con stringify
    inputText.value = ''; //vacia el contenido de inputText
    inputId.value= '', //vacia el contenido de inputId
    renderTareas(); //llama a la función renderTareas()
});

//--------------------------------renderizado (read - get)-------------------------------------------------------------------------------------------
const renderTareas = ( ) => {
    tareas = JSON.parse(localStorage.getItem("tareas")) || []; //convierto con JSON.parse()  objeto js los datos traidos desde el localStorage o un array vacio
    const tBody = document.querySelector('tbody'); // creo una constante tbody, su valor será la etiqueta tbody del index.html
    tBody.innerHTML=''; //vacio de contenido al tbody
    tareas.forEach((tarea) => //recorro tareas, por cada tarea, al tbody le agrego contendido html, como uso Backtick empleo ${} para agregar contenido js
    //empleo un ternario para agregar una clase para css para el tachado de la tarea
        (tBody.innerHTML +=
            `
            <tr>
                <td class="${tarea.complete ? "complete" : ""}">${tarea.text}</td> 
                <td>
                    <button data-id="${tarea.id}" class="btn-completar">Completar</button>
                    <button onClick="editarTarea(${tarea.id})">Editar</button>
                    <button onClick="borrarTarea(${tarea.id})">Borrar</button>
                </td>
            </tr>
            `
        )
    )
    };

//------------------------------------------------------------------------------------------------------------------------------------------------------

    document.addEventListener('click', (e)=> { // pongo al documento a escuchar el evento click del boton
        if(e.target.classList.contains('btn-completar')) { // si el boton posee la clase "btn-completar"
            completarTarea(e.target.dataset.id) //ejecuto completarTarea que recibe como argumento el atributo data-id del boton, dicho id será el id de cada tarea 
        }
    });

//--------------------------------------------------------------------------------------------------------------------------------------------------------
    const completarTarea = (id) => { //hago la funcion completarTarea, recibe como parametro un id
        tareas.forEach((tarea) => { //recorro tareas, por cada tarea
            if(tarea.id == id) { // evaluo si se cumple la condicion (el id de tarea es igual al id que recibo como argumento)
                tarea.complete = !tarea.complete; // si la condcion se cumple, a la clave complete de tarea le asigno el valor opuesto al que tiene
            }
        });
        localStorage.setItem("tareas", JSON.stringify(tareas));
        renderTareas(); //envio los cambios al localStorage
    }

//----------------------edición de tarea (update - put)-----------------------------------------------------------------------------------------------------
    const editarTarea = (id) => { // hago la funcion editarTarea, recibe como parametro un id
        const tarea = tareas.find((tarea) => tarea.id === id); //genero una constante tareas, su contenido sera la tarea encontrada de tareas... coincidencia entre id de tarea y id como argumento de la funcion
        if(tarea) {  // si la tarea es encontrada, genero dos constantes inputId e inputText
            const inputId = document.querySelector("#id");
            inputId.value = tarea.id; //al value de inputId le asigno el id de la tarea
            const inputText = document.querySelector8("#text");
            inputText.value = tarea.text; // al value de inputText le asigno el contenido de la clave text de la tarea
        }
    }

//-----------------------eliminación de tarea (delete - delete)---------------------------------------------------------------------------------------------
    const borrarTarea = (id) => { //  hago la funcion eliminarTarea, recibe como parametro un id
        if(confirm("¿Estas Seguro?")) { // establezco una confirmacion por parte del usuario, si es true genero una constante filtradas cuyo contenido seran las tareas que no coincidan con el id que se recibe como argumento 
        const filtradas = tareas.filter((tarea) => tarea.id != id);
        localStorage.setItem("tareas", JSON.stringify(filtradas)); //envió la lista de tareas filtras al localStorage
        renderTareas(); //ejecuto la funcion renderizado para mostradas las tareas filtradas
        }
    }

//------------------------------------------------------------------------------------------------------------------------------------------------------------
    document.addEventListener("DOMContentLoaded", ( )=> { // pongo al documento a escuchar el evento DOMContentLoaded: carga y analisis del documento html - no espera asincronismo
        renderTareas(); // una vez cargado el documento se ejecuta la funcion renderTareas()
    });