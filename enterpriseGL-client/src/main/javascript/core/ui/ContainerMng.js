/**
 * This class manage interaction with container.
 */
EntGL.ContainerMng = {
    panelTimelineId: "timelinePanel",
    panelControlsId: "panelControls",
    
    init: function(config){
        this.container = $("#" + config.main );    
        this.infoContainer = $("#" + config.info );  
    },
    
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
        var p, html = 
            "<div id='" + this.panelControlsId + "'>" +
                "<div id='" + this.panelControlsId + "-showButtons' class='panelButtons'>" + 
                    "<a onclick='EntGL.Controller.invoke(\"showPanels\")'>" + "+ </a>" +
                "</div>" +
                "<div id='" + this.panelControlsId + "-hideButtons' class='panelButtons'>" + 
                    "<a onclick='EntGL.Controller.invoke(\"hidePanels\")'>" + "- </a>";
        for(p in panels.list){
            html+="<a onclick='EntGL.Controller.invoke(\"" + p + "\")'>" 
                + panels.list[p].title + "</a>"; 
        }
        html +=            
                "</div>" +                
                "<div id='" + this.panelControlsId + "-content'>" + 
                "</div>" +                
            "</div>";
        this.add(html);
        // register all commands
        EntGL.Controller.register({id:"showPanels",execute: this.showControls});            
        EntGL.Controller.register({id:"hidePanels",execute: this.hideControls});            
        for(p in panels.list){
            var command = panels.list[p];
            EntGL.Controller.register({id: p, execute: function(){
                    if(command.isRemotePage){
                        this.askServerAction(command.param)
                    } else {
                        //TODO create a page from comman.param string
                        //change panel with page
                    }
                }
            });            
        }
        return html;
    },
    
    
    
    hideAction: function(elemId){
        $("#" + elemId + "-content").hide();
        $("#" + elemId + "-showButtons").show();    
        $("#" + elemId + "-hideButtons").hide();    
    },
    showAction: function(elemId){
        $("#" + elemId + "-content").show();
        $("#" + elemId + "-showButtons").hide();    
        $("#" + elemId + "-hideButtons").show();            
    },
    changeAction: function(elemId, text){
        $("#" + elemId + "-content").empty();
        $("#" + elemId + "-content").prepend(text);
        // TODO control insert text
        $("a.textLink").click(EntGL.ContainerMng
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
            beforeSend: EntGL.ContainerMng.prepareAjaxAction,
            success: function(text){
                EntGL.ContainerMng.changeAction(EntGL.ContainerMng.panelControlsId,text);
            },
            error: EntGL.ContainerMng.errorAction    
        });        
    },
    
    hideControls: function(){
        EntGL.ContainerMng.hideAction(
            EntGL.ContainerMng.panelControlsId);
    },
    showControls: function(){
        EntGL.ContainerMng.showAction(
            EntGL.ContainerMng.panelControlsId);
    },
    hideTimeline: function(){
        EntGL.ContainerMng.hideAction(
            EntGL.ContainerMng.panelTimelineId);
    },
    showTimeline: function(){
        EntGL.ContainerMng.showAction(
            EntGL.ContainerMng.panelTimelineId);
    },
    
}
