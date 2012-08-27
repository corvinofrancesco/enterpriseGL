EntGL.Panel = function(){
    this.panelName = "unknow";
    this.panelId = "unknow"
    this.fields = {};
}

EntGL.Panel.Style = {
    Class: "EntGLPanel",
}

EntGL.Panel.prototype = {
    /**
     * Take object properties init for <code>change</code>
     */
    linkTo: function(object){
        if(object.getPanelFields){
            this.fields = object.getPanelFields();
        } else {
            for(var p in object){
                if(object[p] instanceof Function)
                    if(p.search("change") != -1){
                        this.fields[p] = {
                            type: "text",
                            onChange: function(val){
                                object[p].call(object,val)
                            }
                        }
                    }
            }
        }
    },
    
    toString: function(){
        var html = 
            "<div " +
                "id='" + this.panelId + "' " +
                "class='" + EntGL.Panel.Style.Class + "'>" +
                "<h3>" + this.panelName + "</h3>";
        for(var f in this.fields){
            
        }
        html+= "</div>";
        return html;
    }
}