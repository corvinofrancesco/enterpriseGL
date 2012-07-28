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
    <input type="hidden" name="table" value="${table.name}" />            
    <fieldset>
        <legend>${table.name} Table</legend>
        <p>${table.description}</p>
        <span>${message}</span>        
        <c:choose>
            <c:when test="${model.getTable(table.name).isLoad}">
                Complete -> Change table 
            </c:when>
            <c:otherwise>
                Incomplete -> Load table
            </c:otherwise>
        </c:choose>
        <select name="source">
            <option value="hssf">Excel 2003</option>
            <option value="xssf">Excel 2007</option>
        </select>
        <input id="file${table.name}" type="file" name="file"/>
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