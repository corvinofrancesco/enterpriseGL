<%-- 
    Document   : graphic
    Created on : 18-lug-2012, 15.19.49
    Author     : Francesco Corvino
--%>
<script type="text/javascript">
    $(document).ready(function() {
        $("#commandForm").ajaxForm({ success: function(html) {configuration.menu.changeWith(html);}});
    });
</script>	

<form id="commandForm" class="commandForm">
    <fieldset id="body">
        <h3>Graphical Configurations</h3>
    
        
    </fieldset>
</form>
