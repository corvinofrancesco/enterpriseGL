<%-- 
    Document   : view
    Created on : 12-lug-2012, 16.07.07
    Author     : Francesco Corvino
--%>
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