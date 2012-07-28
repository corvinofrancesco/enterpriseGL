<%-- 
    Document   : formupload
    Created on : 27-lug-2012, 17.32.42
    Author     : Francesco
--%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="s" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>

<form id="formUpload" method="post" action="/fileupload" 
      enctype="multipart/form-data" class="commandForm">
    <input type="hidden" name="name" value="${model.name}" />            
    <input type="hidden" name="tableId" value="${table.name}" />            
    <h3>${table.name} Table</h3>
    <p>
        ${table.description}
        <br/>
        <c:choose>
            <c:when test="${model.getTable(table.name).isLoad}">
                <b>Complete</b>: '${model.getTable(table.name).sourceConfig}'
            </c:when>
            <c:otherwise>
                <b>Incomplete</b> 
            </c:otherwise>
        </c:choose>   
        <c:if test="${not empty message}">
            <br/>
            <span>${message}</span>                        
        </c:if>
    </p>
    <b>Load table</b>            
    <fieldset id="body">
        <fieldset>
            <label>Source type</label>
            <select name="source">
                <option value="hssf">Excel 2003</option>
                <option value="xssf">Excel 2007</option>
            </select>
        </fieldset>
        <fieldset>
            <label>File</label>
            <input id="file${table.name}" type="file" name="file"/>            
        </fieldset>
        <input type="submit" id="login" value="Load"/>
    </fieldset>
</form>
<script type="text/javascript">
    $(document).ready(function() {
        $("#formUpload").ajaxForm({ success: function(html) {
                $("#areaForTable").empty();
                $("#areaForTable").prepend(html);
            }
        });
    });
</script>	
