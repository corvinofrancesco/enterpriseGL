<%-- 
    Document   : home
    Created on : 16-lug-2012, 17.23.36
    Author     : Sara Giacovelli
--%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="s" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<html>
    <head>
        <title>Home</title>
        <link rel="stylesheet" href="<c:url value="/resources/menucss/style.css" />" />
        <script type="text/javascript" src="<c:url value="/resources/jquery/1.6/jquery.js" />"></script>
        <script type="text/javascript" src="<c:url value="/resources/enterpriseGL/Three.js" />"></script>
        <script type="text/javascript" src="<c:url value="/resources/enterpriseGL/enterpriseGL-client-1.0-SNAPSHOT.js" />"></script>
        <script type="text/javascript" src="<c:url value="/resources/jqueryform/2.8/jquery.form.js" />"></script>
        <script type="text/javascript" src="<c:url value="/resources/menucss/menuController.js"/>"></script>
    </head>
    <body onload="create()">
        <script type="text/javascript">

            var configuration = {
                startReq: { link: "<c:url value='/list'/>"},
                menu: new MenuController("#content",{
                    Models:'<c:url value="/list"/>',
                    Graphics:'<c:url value="/graphic"/>',
                    Search:'<c:url value="/search" />'
                }),
                link: new LinkController(),
                cntError: function(xhr){alert("Error! Fail connection at the server.")},
                prepareAjax: function(req){
                    req.setRequestHeader("Accept", "text/plain;charset=UTF-8");
                    req.setRequestHeader("ajaxRequest", "true");
                }
            };
            /** 
             * Javascript code for enviroment configurations
             **/
            function create(){
                var enviroment = new EntCanvasManager();
            }

            function log(msg,elem,override){
                var idLog = "LOG";
                if(elem) idLog = elem;
                var object = document.getElementById(idLog);
                if(!object) return;
                if(override) {
                    object.innerHTML = (msg + "\n");                    
                } else {
                    object.innerHTML += (msg + "\n");                    
                }
            }

        </script>
        <div id="container">
            <div class="descriptionBox" id="descriptionBox">
            </div>  
            <div id="controlPanel" >
                <div id="showButton" class="panelControls">
                    <a onclick="configuration.menu.showPanel();">Show</a>
                </div>
                <div id="hideButton" class="panelControls">
                    <a onclick="configuration.menu.hiddenPanels();">Hidden</a> 
                    <a onclick="configuration.menu.goTo('Graphics')">Graphics</a>
                    <a onclick="configuration.menu.goTo('Models')">Models</a>
                    <a onclick="configuration.menu.goTo('Search')">Search</a>
                </div>
                <div id="content"></div>
            </div>
        </div>
    </body>
</html>
