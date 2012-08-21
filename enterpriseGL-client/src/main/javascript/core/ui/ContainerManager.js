/**
 * This class manage interaction with container.
 */
function ContainerManager(config){
    this.container = $("#" + config.main );    
    this.infoContainer = $("#" + config.info );    
}

ContainerManager.prototype = {
    writeInfo: function(message){
        this.infoContainer.empty();
        this.infoContainer.show();
        this.infoContainer.prepend(message);
    },
    
    hiddenInfo: function(){
        this.infoContainer.hide();
    },
    
    add: function(subCont){
        this.container.prepend(subCont);
    },
    
    changeMainCursor: function(cursor){
        this.container.get(0).style.cursor = cursor;
    }
}
