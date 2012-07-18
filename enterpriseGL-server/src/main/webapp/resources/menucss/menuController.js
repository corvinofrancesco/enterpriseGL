function LinkController(){
    $("a.textLink").click(function(){
        var link = $(this);
        $.ajax({
            url: link.attr("href"), dataType: "text",
            beforeSend: function(req){configuration.prepareAjax(req)},
            success: function(text){configuration.menu.changeWith(text);},
            error: function(xhr){configuration.cntError(xhr);}    
        });
        return false;
    });    
}

function MenuController(contentId,menu){
    this.contentId = contentId;    
    this.menu = menu;
}

MenuController.prototype = {
    
    changeWith: function(text){
        $(this.contentId).empty();
        $(this.contentId).prepend(text);
        new LinkController();
    },
    
    cancelOp: function(){
        $.ajax({
            url: configuration.startReq.link,
            dataType: "text",
            beforeSend: function(req){configuration.prepareAjax(req)},
            success: function(text){configuration.menu.changeWith(text);},
            error: function(xhr){configuration.cntError(xhr);}    
        });
        return false;
    },
    
    hiddenPanels: function (){
        $(this.contentId).hide();
        $("#showButton").show();    
        $("#hideButton").hide();    
    },

    showPanel: function(){
        $(this.contentId).show();
        $("#showButton").hide();    
        $("#hideButton").show();    
    },
    
    goTo: function(menuId){
        $.ajax({
            url: this.menu[menuId],
            dataType: "text",
            beforeSend: function(req){configuration.prepareAjax(req)},
            success: function(text){configuration.menu.changeWith(text);},
            error: function(xhr){configuration.cntError(xhr);}    
        });
    }
}

/**
 * Init menu when page is load
 */
$(document).ready(function(){
    new EntCanvasManager();
    $.ajax({
        url: configuration.startReq.link,
        dataType: "text",
        beforeSend: function(req){configuration.prepareAjax(req)},
        success: function(text){configuration.menu.changeWith(text);},
        error: function(xhr){configuration.cntError(xhr);}    
    });
});                
