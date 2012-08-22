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
    
    errorAction: function(xhr){
        alert("Error! Fail connection at the server.");
    },
    
    prepareAjaxAction: function(req){
        req.setRequestHeader("Accept", "text/plain;charset=UTF-8");
        req.setRequestHeader("ajaxRequest", "true");        
    },
    
    askServerAction: function(urlRequest){
        $.ajax({
            url: urlRequest,
            dataType: "text",
            beforeSend: EntGL.ControlPanels.prepareAjaxAction,
            success: function(text){
                EntGL.ControlPanels.changeAction(EntGL.ControlPanels.panelControlsId,text);
            },
            error: EntGL.ControlPanels.errorAction    
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
    
    execute: function(command){
        if(command.isRemotePage){
            this.askServerAction(command.param)
        } else {
            //TODO create a page from comman.param string
            //change panel with page
        }
    }
};
