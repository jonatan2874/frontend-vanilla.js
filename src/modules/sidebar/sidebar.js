import {sidebarItem} from './sidebarItem.js';
/** Importacion de los modulos del app */
import {usuarios} from '../usuarios/usuarios.js'

var contentUsuarios = usuarios();

const sidebar = () => {
    // tipos de items (divider,heading,item)
    // el icono debe ser los disponibles en font awsome
    const modules = [
                        {
                            type : 'item',
                            text  : 'Dashboard',
                            icon : 'fa-tachometer-alt'
                        },
                        { type : 'divider' },
                        {
                            type : 'heading',
                            text : 'configuracion'
                        },
                        {
                            type : 'item',
                            text  : 'Usuarios',
                            icon : 'fa-user',
                            content : usuarios()
                        },
                        {
                            type : 'item',
                            text  : 'Utilidades',
                            icon : 'fa-wrench',
                            items : [
                                    { header : 'utilidades personalizadas'},
                                    { text : 'utilidad 1' },
                                    { text : 'utilidad 2' },
                                    { text : 'utilidad 3' }
                            ]
                        },
                    ]

    const loadModules = modules =>{
        let items = ''
        modules.forEach((element,index) => {            
            items += sidebarItem(element);
        });
        return items;
    }
    let content =`
            <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
                
                <!-- Sidebar - Brand -->
                <a class="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                <div class="sidebar-brand-icon rotate-n-15">
                    <i class="fas fa-laugh-wink"></i>
                </div>
                <div class="sidebar-brand-text mx-3">Mi App</div>
                </a>

                <!-- Divider -->
                <hr class="sidebar-divider my-0">
                
                ${loadModules(modules)}                

                <!-- Divider -->
                <hr class="sidebar-divider d-none d-md-block">

                <!-- Sidebar Toggler (Sidebar)
                <div class="text-center d-none d-md-inline">
                <button class="rounded-circle border-0" id="sidebarToggle"></button>
                </div> -->

            </ul>        
    `;
    return content;
}

export {sidebar};

var EXPORTED_SYMBOLS = ["contentUsuarios"]