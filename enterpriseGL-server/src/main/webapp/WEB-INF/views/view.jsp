<%-- 
    Document   : view
    Created on : 12-lug-2012, 16.07.07
    Author     : Francesco Corvino
--%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="s" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>

<script type="text/javascript">
    $(document).ready(function() {
        $("#commandForm").ajaxForm({ 
            success: function(html) {
                configuration.menu.changeWith(html);
                EntInteraction.changeModel("${model.name}");
            }
        });
    });
</script>	

<form id="commandForm" method="post" action="/load" class="commandForm">
    <fieldset id="body">
        <h3>View of ${model.name}</h3>
        <p> Model with: </p>
        <ul>
            <li>Items: ${model.particles.size()}</li>
            <li>Relations: ${model.relations.size()}</li>
        </ul>
        <fieldset>
            <label>Select type of visualization for the model</label>
            <select name="diagram">
                <option value="graph">Graph</option>
                <option value="tree">Tree</option>
                <option value="conetree">ConeTree</option>
            </select>
        </fieldset>        
        <input type="submit" id="login" value="Load"/>
        <input type="submit" id="login" value="Cancel" onclick="return configuration.menu.cancelOp();"/>
    </fieldset>
</form>