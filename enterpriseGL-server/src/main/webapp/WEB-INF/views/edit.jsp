<%-- 
    Document   : edit
    Created on : 12-lug-2012, 16.06.49
    Author     : Francesco Corvino
--%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="s" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>

<script type="text/javascript">
    var EditForm_CurrentTable = null;
    function EditForm_showImportTable(name){
        if(EditForm_CurrentTable){
            EditForm_CurrentTable.hide();
        } 
        EditForm_CurrentTable = $("#form"+name);
        EditForm_CurrentTable.show();
    }
    
    $(document).ready(function() {
        $("#formEditManager").ajaxForm({ success: function(html) {
                configuration.menu.changeWith(html);
            }
        });
    });
</script>

<form id="formEditManager" action="/view/${model.name}"  method="post" class="commandForm">
    <fieldset id="body">
        <h2>Model name: ${model.name}</h1>
        <p>Load or edit model</p>
        <ul>
        <c:forEach var="table" items="${model.typeModel.tables}">
            <li onmousemove="EditForm_showImportTable('${table.name}');">
                ${table.name} - 
                <c:choose>
                    <c:when test="${model.getTable(table.name).isLoad}">Complete</c:when>
                    <c:otherwise>Incomplete</c:otherwise>
                </c:choose>
            </li>
        </c:forEach>    
        </ul>   
        <c:if test="${not empty message}">
            <div id="message" class="success">${message}</div>	
        </c:if>
        <input type="submit" id="login" value="Cancel" onclick="return configuration.menu.cancelOp();"/>
        <input type="submit" id="login" value="View"/>
    </fieldset>               
</form>
    
<c:forEach var="table" items="${model.typeModel.tables}">
    <form id="form${table.name}" method="post" action="/fileupload" 
          enctype="multipart/form-data" class="commandForm" style="display:none;">
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
                    configuration.menu.changeWith(html);
                    //$("#msg${table.name}").replaceWith(html);
                }
            });
        });
    </script>	
</c:forEach>    
