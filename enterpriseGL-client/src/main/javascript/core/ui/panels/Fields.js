EntGL.Field = function(funToString){
    if(funToString instanceof Function)
        this.toString = funToString;
};

EntGL.Field.prototype.toString = function(){
    return "";
}

EntGL.Fields = {};

EntGL.Fields.Comment = function(text){
    var field = new EntGL.Field(function(){
        return "<span>" + text + "</span>";
    });
    return field;    
}

EntGL.Fields.Select = function(paramName, values){
    var field = new EntGL.Field(function(){
        var opt, html = 
            "<select onchange='EntGL.params." + paramName + "= this.value;'>";
        for(opt in values) html +=
            "<option value='" + values[opt] + "' >" + opt + "</option>";
        html += "</select>";
        return html;
    });
    return field;
}

EntGL.Fields.Button = function(title,action){
    return new EntGL.Field(function(){
        return "<input type='button' value='"+title +"' " +
            "onclick='" + action + "'>";
        
    });
}

EntGL.Fields.List = function(title, list){
    return new EntGL.Field(function(){
        var html = "<h3>" + title + "</h3>";
        for(var i in list){
            
        }
        return html;
    });
}