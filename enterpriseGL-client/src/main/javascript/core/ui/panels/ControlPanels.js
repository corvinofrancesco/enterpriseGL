EntGL.ControlPanels = {
    panelTimelineId: "timelinePanel",
    panelControlsId: "eglcontrolsPanel",
    hideAction: function(elemId){
        $("#" + elemId ).hide();
        $("#" + elemId + "-showButton").show();    
        $("#" + elemId + "-hideButton").hide();    
    },
    showAction: function(elemId){
        $("#" + elemId ).show();
        $("#" + elemId + "-showButton").hide();    
        $("#" + elemId + "-hideButton").show();            
    },
    changeAction: function(elemId, text){
        $("#" + elemId).empty();
        $("#" + elemId).prepend(text);
        // TODO control insert text
        $("a.textLink").click(EntGL.ControlPanels
            .askServerAction.call(this,attr("href")));
    },    
    
    askServerAction: function(url){
        $.ajax({
            url: configuration.startReq.link,
            dataType: "text",
            beforeSend: function(req){configuration.prepareAjax(req)},
            success: function(text){configuration.menu.changeWith(text);},
            error: function(xhr){configuration.cntError(xhr);}    
        });        
    },
    
    hideControls: function(){
        EntGL.ControlPanels.hideAction(
            EntGL.ControlPanels.panelControlsId);
    },
    showControls: function(){
        EntGL.ControlPanels.showAction(
            EntGL.ControlPanels.panelControlsId);
    },
    hideTimeline: function(){
        EntGL.ControlPanels.hideAction(
            EntGL.ControlPanels.panelTimelineId);
    },
    showTimeline: function(){
        EntGL.ControlPanels.showAction(
            EntGL.ControlPanels.panelTimelineId);
    },
    
};
