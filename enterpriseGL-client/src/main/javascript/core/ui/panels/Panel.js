EntGL.Panel = function(tree){
    this.panelName = "unknow";
    this.panelId = "unknow"
    this.tree = tree || {};
}

EntGL.Field = function(funToString){
    if(funToString instanceof Function)
        this.toString = funToString;
};

EntGL.Field.prototype.toString = function(){
    return "";
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
        var q=[this.tree],currNode,
            html = 
            "<div " +
                "id='" + this.panelId + "' " +
                "class='" + EntGL.Panel.Style.Class + "'>" +
                "<h3>" + this.panelName + "</h3>";
        while(q.length>0){
            currNode = q.shift();
            if(currNode instanceof EntGL.Field){
                // add html code in the panel
                html += currNode;
            } else {
                //TODO suddivide tree branches
                for(var child in currNode)
                    q.push(currNode[child]);
            }
        }
        html+= "</div>";
        return html;
    }
}