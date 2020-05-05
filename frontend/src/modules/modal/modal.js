const modal =  params =>{
    let content = `<!-- Modal -->                    
                    <div class="modal fade" id="${params.modalId}" tabindex="-1" role="dialog" aria-labelledby="modalAppTitle" aria-hidden="true">
                        ${params.content}
                    </div>`;
    
    if(params.open){
        if(document.getElementById(`${params.parentModalId}`)) { 
            document.getElementById(`${params.parentModalId}`).innerHTML = content
            $(`#${params.modalId}`).modal()
        }
        else{
            let modal = document.createElement('div');
            modal.setAttribute("id",`${params.parentModalId}`)
            modal.innerHTML = content
            document.body.appendChild(modal);
            $(`#${params.modalId}`).modal()
        }
        
    }
    if(params.close){
        $(`#${params.modalId}`).modal()
        $(`#${params.parentModalId}`).remove();
        $('.modal-backdrop').remove();
        $( "body" ).removeClass( "modal-open" );
    }
    
}