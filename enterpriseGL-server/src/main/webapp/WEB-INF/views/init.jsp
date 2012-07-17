<%-- 
    Document   : init
    Created on : 19-giu-2012, 12.23.02
    Author     : Francesco Corvino
--%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="s" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<c:if test="${!ajaxRequest}">
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
                                    <c:if test="${empty models}">
                                        <p>Nessun modello caricato</p>
                                    </c:if>

                                    <c:if test="${not empty models}">
                                        Modelli inseriti:
                                        <table class="search" border="3">
                                            <tr>
                                                <th>Name</th>
                                                <th>Status</th>
                                                <th>Last change</th>
                                                <th>Tables</th>
                                                <th>Actions</th>
                                            </tr>
                                            <c:forEach var="model" items="${models}">
                                                <tr>
                                                    <td>${model.name}</td>
                                                    <td>${model.status}</td>
                                                    <td><fmt:formatDate value="${model.lastChange}" pattern="yyyy-MM-dd" /></td>
                                                    <td>
                                                        <c:if test="${not empty model.typeModel.tables}">
                                                            ${model.typeModel.tables.size()}
                                                        </c:if>                
                                                    </td>
                                                    <td>
                                                        <a href='<s:url value="/view/${model.name}" />' >View</a>
                                                        <a href='<s:url value="/edit/${model.name}" />' >Edit</a>
                                                        <a href='<s:url value="/delete/${model.name}" />' >Delete</a>
                                                    </td>
                                                </tr>
                                            </c:forEach>
                                        </table>        
                                    </c:if>
                                </fieldset>
                                <span><b><a href='<c:url value="/create" />' >CREATE A NEW MODEL</a></b></span>
                            </form>
                        </div>
                    </div>
                </div>
            </div>


        </c:if>
        <c:if test="${!ajaxRequest}">
        </body>
    </html>
</c:if>