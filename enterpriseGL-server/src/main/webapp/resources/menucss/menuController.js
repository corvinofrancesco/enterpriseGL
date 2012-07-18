function hiddenPanel(){
    $("#content").hide();
    $("#showButton").show();    
    $("#hideButton").hide();    
}

function showPanel(){
    $("#content").show();
    $("#showButton").hide();    
    $("#hideButton").show();    
}

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

function MenuController(contentId){
    this.contentId = contentId;    
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
    }
}

/**
 * Init menu when page is load
 */
$(document).ready(function(){
    $.ajax({
        url: configuration.startReq.link,
        dataType: "text",
        beforeSend: function(req){configuration.prepareAjax(req)},
        success: function(text){configuration.menu.changeWith(text);},
        error: function(xhr){configuration.cntError(xhr);}    
    });
});                
