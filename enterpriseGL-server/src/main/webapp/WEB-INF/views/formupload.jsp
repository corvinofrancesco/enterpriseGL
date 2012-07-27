<%-- 
    Document   : formupload
    Created on : 27-lug-2012, 17.32.42
    Author     : Francesco
--%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="s" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>

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
        $("#form${table.name}").ajaxForm({ success: function(html) {
                configuration.menu.changeWith(html);
                //$("#msg${table.name}").replaceWith(html);
            }
        });
    });
</script>	
