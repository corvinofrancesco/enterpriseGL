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
    $("form.commandForm")
}

function MenuController(buttonId, boxId, formId){
    this.buttonId = buttonId;
    this.boxId = boxId;
    this.formId = formId;
    this.loader = function(){
        $(function() {
            var button = $(buttonId);
            var box = $(boxId);
            var form = $(formId);
            button.removeAttr('href');
            button.mouseup(function(login) {
                box.toggle();
                button.toggleClass('active');
            });
            form.mouseup(function() { 
                return false;
            });
            $(this).mouseup(function(login) {
                if(!($(login.target).parent(buttonId).length > 0)) {
                    button.removeClass('active');
                    box.hide();
                }
            });
        });        
    };
    
    this.changeWith = function(text){
        $(boxId).empty();
        $(boxId).prepend(text);
        this.loader();
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
