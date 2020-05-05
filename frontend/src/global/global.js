/**
 * loadingBtn Funcion para generar "loading" sobre un boton
 * @param {Object} params Objeto con los parametros necesarios de la funcion 
 * @param {string} params.action Opcion del load a disparar (on,off)
 * @param {DOMelemen} params.button Elemento del dom (button) sobre el que se mostrara el loading
 * @param {String} params.text Texto a mostrar tanto antes como despues del load y que quedara en el, boton
 * example
 * loadingBtn({action:'on', button:button, text : 'Guardando...' });
 * loadingBtn({action:'off', button:button, text : 'Guardar',type:'error',finish_text : "Se produjo un error al guardar" }); 
 */
const loadingBtn = params => {
    params.type = !params.type ? 'success' : params.type;
    let buttons = []
    buttons["error"] = {
                        class : 'btn-danger',
                        icon  : '<i class="fas fa-trash"></i>',
                        text  : 'Se produjo un error'
                    }
    buttons["success"] = {
                        class : 'btn-success',
                        icon  : '<i class="fas fa-check"></i>',
                        text  : 'Informacion Almacenada'
                    }
    
    let bntContent = `<a href="#" class="btn btn-primary btn-icon-split">
                            <span class="icon text-white-50"><i class="fas fa-save"></i></span>
                            <span class="text">${!params.text || params.text==''? 'Guardar' : params.text }</span>
                        </a>`;
    
    if(params.action == 'on'){
        params.button.disabled = true;
        params.button.classList.add("btn-primary");
        params.button.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>&nbsp; ${!params.text || params.text==''? 'Cargando...' : params.text }`;
    }
    else if(params.action=='off'){
        params.button.disabled = false;
        params.button.classList.remove("btn-primary");
        
        params.button.innerHTML = `<a href="#" class="btn ${buttons[params.type].class} btn-icon-split">
                                        <span class="icon text-white-50">${buttons[params.type].icon}</span>
                                        <span class="text">${!params.finish_text || params.finish_text==''? buttons[params.type].text : params.finish_text }</span>
                                    </a>`;
        // params.button.innerHTML = `${!params.text || params.text==''? 'Guardar' : params.text }`;
        setTimeout(function(){ params.button.innerHTML = bntContent; }, 2000);
        

    }
}


