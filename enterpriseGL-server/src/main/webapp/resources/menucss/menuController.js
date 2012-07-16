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


