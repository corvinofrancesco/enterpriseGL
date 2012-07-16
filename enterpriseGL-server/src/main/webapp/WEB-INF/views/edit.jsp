<%-- 
    Document   : edit
    Created on : 12-lug-2012, 16.06.49
    Author     : Francesco Corvino
--%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="s" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>

<c:if test="${!ajaxRequest}">
    <html>
        <head>
            <title>Edit</title>
            <link rel="stylesheet" href="<c:url value="/resources/menucss/style.css" />" />
            <script type="text/javascript" src="<c:url value="/resources/jquery/1.6/jquery.js" />"></script>
            <script type="text/javascript" src="<c:url value="/resources/jqueryform/2.8/jquery.form.js" />"></script>	
            <script src="<c:url value="/resources/menucss/menuController.js"/>"></script>
        </head>
        <body>

        <div id="bar">
            <div id="container">
                <div class="commandContainer">
                    <a href="#" id="commandButton" class="commandButton"><span>Edit</span><em></em></a>
                    <div style="clear:both"></div>
                    <div id="commandBox" class="commandBox">
                        <form id="commandForm" class="commandForm">
                        <fieldset id="body">
                                <h1>Model name: ${model.name}</h1>
                                <h2>Load or edit model</h2>
                                <c:if test="${not empty message}">
                                    <div id="message" class="success">${message}</div>	
                                </c:if>
                            <c:forEach var="table" items="${model.typeModel.tables}">
                                <form id="form${table.name}" method="post" action="/fileupload" 
                                      enctype="multipart/form-data" class="cleanform">
                                    <input type="hidden" name="name" value="${model.name}" />            
                                    <input type="hidden" name="table" value="${table.name}" />            
                                    <fieldset>
                                        <legend>${table.name} Table</legend>
                                        <select name="source">
                                            <option value="hssf">Excel 2003</option>
                                            <option value="xssf">Excel 2007</option>
                                        </select>
                                        <input id="file${table.name}" type="file" name="file"/>
                                        <p>${table.description}</p>
                                        <input type="submit" id="login" value="Load"/>
                                    </fieldset>
                                    <span id="msg${table.name}"></span>
                                </form>
                                <script type="text/javascript">
                                    $(document).ready(function() {
                                        $('<input type="hidden" name="ajaxUpload" value="true" />').insertAfter($("#file${table.name}"));
                                        $("#form${table.name}").ajaxForm({ success: function(html) {
                                                $("#msg${table.name}").replaceWith(html);
                                            }
                                        });
                                    });
                                </script>	

                            </c:forEach>    
                        </fieldset>
                                </form>
                        </div>
                    </div>
                </div>
            </div>

        </body>
    </html>
</c:if>