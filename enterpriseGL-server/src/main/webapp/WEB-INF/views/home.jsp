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
        <script src="<c:url value="/resources/menucss/menuController.js"/>"></script>
    </head>
    <body onload="create()">
        <script type="text/javascript">
            /** 
             * Javascript code for enviroment configurations
             **/
            function create(){
                var enviroment = new EntCanvasManager();
                $(document).ready(function(){
                    $.ajax({
                        url:"<c:url value='/list'/>",
                        dataType:"text",
                        beforeSend: function(req){
                            req.setRequestHeader("Accept", "text/plain;charset=UTF-8");
                            req.setRequestHeader("ajaxRequest", "true");
                        },
                        success: function(text){
                            $(text).insertAfter("#bodyContent"); 
                                
                        },
                        error: function(xhr){
                            alert("Errore di connessione al server")
                        }    
                    });
                    $("a.textLink").click(function(){
                        var link = $(this);
                        $.ajax({
                            url:link.attr("href"),
                            dataType: "text",
                            beforeSend: function(req){
                                req.setRequestHeader("Accept", "text/plain;charset=UTF-8");
                                req.setRequestHeader("ajaxRequest", "true");
                            },
                            success: function(text){
                                $("#commandBox").replaceWith(text);
                                var mc = new MenuController("#commandButton", "#commandBox", "#commandForm");
                                mc.loader();
                                //$("#commandBox").replaceWith(text);
                                //$(text).insertAfter("#body");
                                //$("#body").replaceWith(text); 

                            },
                            error: function(xhr){
                                alert("Errore di connessione al server")
                            }    
                        });
                        return false;
                    });
                    
                });                
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
        <div id="bar">
            <div id="container">
                <div class="descriptionBox" id="descriptionBox" style="background-color: transparent; position: absolute;">
                </div>  
                <div class="commandContainer">
                    <a href="#" id="commandButton" class="commandButton"><span>Model</span><em></em></a>
                    <div style="clear:both"></div>
                    <div id="commandBox" class="commandBox">
                        <form id="commandForm" class="commandForm">
                            <fieldset id="body">
                                <div id="bodyContent" ></div>
                            </fieldset>
                            <span><b><a href='<c:url value="/create" />' class="textLink">CREATE A NEW MODEL</a></b></span>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>
