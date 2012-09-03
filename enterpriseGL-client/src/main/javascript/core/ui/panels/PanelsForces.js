EntGL.Controller.register({
    id: "addforce",
    execute: function(){
        alert("ciao "+EntGL.params.defaultForce)
    }
});

EntGL.ContainerMng.panels.Forces = new EntGL.Panel({
    create : EntGL.Fields.Select("defaultForce", {
        actration: "actration", 
        gravitational: "gravitational"}
    ),
    createBut : EntGL.Fields.Button("create","EntGL.Controller.invoke(\"addforce\")")
});