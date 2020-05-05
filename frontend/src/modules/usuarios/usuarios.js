const usuarios = () => {
    const render = (content) =>{
        document.getElementById("main-content").innerHTML = content;
        $(document).ready(function() {$("#dataTable").DataTable();});
    } 

    let list = '';
    const response = getUsers('');
    response.then(response =>{
        response.forEach(element => {
            list += `<tr>
                        <td>${element.identificacion}</td>
                        <td>${element.nombres}</td>
                        <td>${element.apellidos}</td>
                        <td>${element.rol}</td>
                        <td>${element.correo}</td>
                        <td>
                            <i class="fas fa-edit pr-2" title="Editar a ${element.nombres}" onclick="formUsuario('edit',${element.id})" ></i>
                            <i class="fas fa-trash" title="Eliminar a ${element.nombres}" onclick="confirmDelete(${element.id}) " ></i></td>
                    </tr>`;      
        });
        
    let content = `<div  data-spy="scroll">
                        <!-- Page Heading -->
                        <h1 class="h3 mb-2 text-gray-800">Usuarios</h1>

                        <!-- DataTales Example -->
                        <div class="card shadow mb-4">
                        <div class="card-header py-3">
                            <a href="#" class="btn btn-info btn-icon-split" onclick="formUsuario('add')">
                                <span class="icon text-white-50">
                                <i class="fas fa-file"></i>
                                </span>
                                <span class="text">Agregar</span>
                            </a>
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                <thead>
                                <tr>
                                    <th>Identificacion</th>
                                    <th>Nombres</th>
                                    <th>Apellidos</th>
                                    <th>Rol</th>
                                    <th>Correo</th>
                                    <th>Acciones</th>
                                </tr>
                                </thead>
                                <tfoot>
                                <tr>
                                    <th>Identificacion</th>
                                    <th>Nombres</th>
                                    <th>Apellidos</th>
                                    <th>Rol</th>
                                    <th>Correo</th>
                                    <th>Acciones</th>
                                </tr>
                                </tfoot>
                                <tbody>
                                    ${list}
                                </tbody>
                            </table>
                            </div>
                        </div>
                        </div>

                    </div>`;
    render(content)
    })


       
}

    const formUsuario = async (option,id=null) =>{
    const render = (content) =>{
        document.getElementById("main-content").innerHTML = content;
    } 

    const title = option=='add' ? 'Agregar un nuevo usuario' : 'Actualizar usuario' ;
    const btnText = option=='add' ? 'Guardar' : 'Actualizar' ;
    let formValues = {
        identificacion : '',
        nombres : '',
        apellidos : '',
        rol : '',
        correo : ''
    }

    if(id){
        const response = await getUsers(`id=${id}`);
        formValues = {
            identificacion : response[0].identificacion,
            nombres : response[0].nombres,
            apellidos : response[0].apellidos,
            rol : response[0].rol,
            correo : response[0].correo
        }
    }

    let content = `<div class="row">
                    <div class="col-lg-6">                   
                        <!-- Basic Card Example -->
                        <div class="card shadow mb-4">
                            <div class="card-header py-3">
                            <h6 class="m-0 font-weight-bold text-primary">${title}</h6>
                            </div>
                            <div class="card-body">
                                <form id="userForm">
                                    <div class="form-group">
                                        <label for="identificacion">Indetificacion</label>
                                        <input type="text" class="form-control form-control-sm" id="identificacion" value="${formValues.identificacion}" >
                                    </div>
                                    <div class="form-group">
                                        <label for="nombres">Nombres</label>
                                        <input type="text" class="form-control form-control-sm" id="nombres" value="${formValues.nombres}" >
                                    </div>
                                    <div class="form-group">
                                        <label for="apellidos">Apellidos</label>
                                        <input type="text" class="form-control" id="apellidos" value="${formValues.apellidos}" >
                                    </div>
                                    <div class="form-group">
                                        <label for="rol">Rol</label>
                                        <input type="text" class="form-control form-control-sm" id="rol" value="${formValues.rol}" >
                                    </div>
                                    <div class="form-group">
                                        <label for="correo">Correo</label>
                                        <input type="email" class="form-control form-control-sm" id="correo" value="${formValues.correo}" >
                                    </div>
                                    <button type="button" class="btn " onclick="saveUpdateUser('${option}',this,${id})">
                                        <a href="#" class="btn btn-primary btn-icon-split">
                                            <span class="icon text-white-50"><i class="fas fa-save"></i></span>
                                            <span class="text">${btnText}</span>
                                        </a>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>`;
        render(content)
    }

    const saveUpdateUser = (option,button,id=null) =>{
        // console.log(button.childNode); return;
        let identificacion = document.getElementById('identificacion').value
        ,   nombres = document.getElementById('nombres').value
        ,   apellidos = document.getElementById('apellidos').value
        ,   rol = document.getElementById('rol').value
        ,   correo = document.getElementById('correo').value

        let params = {
            id : id,
            identificacion : identificacion,
            nombres : nombres,
            apellidos : apellidos,
            rol : rol,
            correo : correo
        }

        loadingBtn({action:'on', button:button, text : 'Guardando...' });
        if(option=='add'){            
            const response = addUser(params);
            response.then(response =>{
                if(response.status=='success'){ 
                    document.getElementById('userForm').reset(); 
                    loadingBtn({action:'off', button:button, text : 'Guardar' }); 
                }
                else{
                    loadingBtn({action:'off', button:button, text : 'Guardar',type:'error',finish_text : "Se produjo un error al guardar el empleado" }); 
                }

                console.log(response)
            })    
        }
        else if(option=='edit'){
            const response = editUser(params);
            response.then(response =>{
                if(response.status=='success'){ 
                    // document.getElementById('userForm').reset(); 
                    loadingBtn({action:'off', button:button, text : 'Actulizar' }); 
                }
                else{
                    loadingBtn({action:'off', button:button, text : 'Actualizar',type:'error',finish_text : "Se produjo un error al actualizar el empleado" }); 
                }
                console.log(response)
            })    
        }
    }

    const confirmDelete = id =>{       
        let content = `<div class="modal-dialog modal-dialog-centered" role="document">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="modalAppTitle">Confirmacion</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                Realmente desea eliminar el registro?
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                                <button type="button" class="btn btn-danger" onclick="deleteUser(${id})">Eliminar</button>
                            </div>
                            </div>
                        </div>`
        modal({
            parentModalId : 'pDeleteUser',
            modalId : 'deleteUser',
            open : true,
            content : content
        });
    }

    const deleteUser = async id =>{
        let contentLoad = `<div class="modal-dialog modal-dialog-centered justify-content-center align-items-center" role="document">
                                <div class="d-flex justify-content-center">
                                    <div class="spinner-border" style="width: 8rem; height: 8rem;"  role="status">
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                </div>
                            </div>`;
        modal({
            parentModalId : 'pDeleteUser',
            modalId : 'deleteUser',
            close : true,
            content : ''
        });
        modal({
            parentModalId : 'pDeleteUser',
            modalId : 'deleteUser',
            open : true,
            content : contentLoad
        });
        const response = await dropUser({id:id});
        if(response.data[0].status=='success'){ 
            modal({
                parentModalId : 'pDeleteUser',
                modalId : 'deleteUser',
                close : true,
                content : ''
            });
            usuarios()
        }
        else{
            let content = `<div class="modal-dialog modal-dialog-centered" role="document">
                                <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="modalAppTitle">Error</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    Se produjo un error y no se elimino el registro
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal" onclick="modal({parentModalId : 'pDeleteUser',modalId : 'deleteUser',close : true,content : ''});" >Aceptar</button>
                                </div>
                                </div>
                            </div>`;
            modal({
                parentModalId : 'pDeleteUser',
                modalId : 'deleteUser',
                close : true,
                content : ''
            });
            modal({
                parentModalId : 'pDeleteUser',
                modalId : 'deleteUser',
                open : true,
                content : content
            });

        }
        // console.log(response)
    }

