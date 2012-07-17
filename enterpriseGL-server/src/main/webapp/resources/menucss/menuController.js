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
    
    this.changeWith = function(text){
        $(contentId).empty();
        $(contentId).prepend(text);
        new LinkController();
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
