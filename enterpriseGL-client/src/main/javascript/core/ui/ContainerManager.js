/**
 * This class manage interaction with container.
 */
EntGL.ContainerMng = function(config){
    this.panelTimelineId = "timelinePanel";
    this.panelControlsId = "eglcontrolsPanel";
    this.container = $("#" + config.main );    
    this.infoContainer = $("#" + config.info );  
}

EntGL.ContainerMng.prototype = {
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
    },
    
    enablePanels: function(panels){
        if(!panels.enable) return null;
        var p,command,html = 
            "<div id='panelControls'>" +
                "<div id='panelControls-showButtons'>" + 
                    "<a onclick=''>" + "+ </a>" +
                "</div>" +
                "<div id='panelControls-hideButtons'>" + 
                    "<a onclick=''>" + "- </a>";
        for(p in panels.list){
            html+="<a onclick=''>"+ panels.list[p].title + "</a>"; 
            command = {
                id: p,
                execute: function(){
                    
                }
                //TODO create command
            };
            EntGL.Controller.register(command);
        }
        html +=            
                "</div>" +                
                "<div id='panelControls-content'>" + 
                "</div>" +                
            "</div>";
        this.add(html);
        return html;
    },
    
    
    
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
    
}
