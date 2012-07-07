/**
 * This class manage interaction with container.
 */
function ContainerManager(config){
    this.container = document.getElementById( config.main );    
    this.infoContainer = document.getElementById( config.info );    
}

ContainerManager.prototype = {
    writeInfo: function(message){
        this.infoContainer.innerHTML = message;
        this.infoContainer.style.dysplay = true;
    },
    
    hiddenInfo: function(){
        this.infoContainer.style.dysplay = false;        
    },
    
    add: function(subCont){
        this.container.appendChild(subCont);
    }
}
