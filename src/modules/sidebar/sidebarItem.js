const sidebarItem = (params = null, key)=>{
    const { type, text, icon, items} = params;
    let content = ``;

    const changeContent = () =>{
        console.log('in')
        if(params.content){
            // document.getElementById('main-content').innerHTML = params.content;
        }
    }

    const render = ()=>{
        // console.log(params.content)
        if(type=='divider'){
            content = `<hr class="sidebar-divider">`;
        }
        else if(type == 'heading'){
            content = `<div class="sidebar-heading">${text}</div>`;
        }
        else if(type == 'item'){
            let options = '';
            if(items){
                items.forEach( element => {
                    options += element.header ? `<h6 class="collapse-header">${element.header}</h6>` : `<a class="collapse-item" href="#">${element.text}</a>` ;
                });
                content = ` <li class="nav-item">
                                <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapse${key}" aria-expanded="true" aria-controls="collapse${key}">
                                    <i class="fas fa-fw fa-wrench"></i>
                                    <span>${text}</span>
                                </a>
                                <div id="collapse${key}" class="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
                                    <div class="bg-white py-2 collapse-inner rounded">
                                    ${options}
                                    </div>
                                </div>
                            </li>`;
            }
            else{
                content = ` <li class="nav-item" onclick="function render(){${changeContent}}">
                                <a class="nav-link" href="#">
                                <i class="fas fa-fw ${icon}"></i>
                                <span>${text}</span></a>
                            </li>`;
            } 
        }
    }
    
    render();    
    return content;
}

export {sidebarItem}