<%-- 
    Document   : edit
    Created on : 12-lug-2012, 16.06.49
    Author     : Francesco Corvino
--%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="s" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
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
