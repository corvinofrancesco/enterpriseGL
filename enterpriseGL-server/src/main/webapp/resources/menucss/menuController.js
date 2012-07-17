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
}

$(function() {
    var button = $('#commandButton');
    var box = $('#commandBox');
    var form = $('#commandForm');
    button.removeAttr('href');
    button.mouseup(function(login) {
        box.toggle();
        button.toggleClass('active');
    });
    form.mouseup(function() { 
        return false;
    });
    $(this).mouseup(function(login) {
        if(!($(login.target).parent('#commandButton').length > 0)) {
            button.removeClass('active');
            box.hide();
        }
    });
});


