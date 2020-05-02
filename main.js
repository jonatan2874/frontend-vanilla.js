import {sidebar} from './src/modules/sidebar/sidebar.js';
import {content} from './src/modules/content/content.js';

document.getElementById('app').innerHTML = `<div id="wrapper">
                                                ${sidebar()}
                                                ${content()}
                                            </div>`;