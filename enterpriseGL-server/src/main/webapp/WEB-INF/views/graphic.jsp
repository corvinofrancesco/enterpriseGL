<%-- 
    Document   : graphic
    Created on : 18-lug-2012, 15.19.49
    Author     : Francesco Corvino
--%>
<script type="text/javascript">
    function GRAPHIC_Update(){
        var 
            primitive = $("#primitiveSelect").val(),
            material = $("#materialSelect").val();
        EntController.instance.graphics.settings.updateSetting(
            {
                particles:{
                    Material:material,
                    TypePrimitive: primitive
                }
            });        
    }
</script>	

<form id="commandForm" class="commandForm">
    <fieldset id="body">
        <h3>Graphical Configurations</h3>
        <fieldset>
            <label>Materials</label>
            <select id="materialSelect" name="materials">
                <option value="lambert">Lambert</option>
                <option value="phong">Phong</option>
                <option value="random">Random</option>
            </select>
        </fieldset>
        <fieldset>
            <label>Items primitive</label>
            <select id="primitiveSelect" name="primitive">
                <option value="random">Random</option>
                <option value="cube">Cubes</option>
                <option value="sphere">Spheres</option>
            </select>
        </fieldset>
        <input type="button" value="Apply" onclick="return GRAPHIC_Update();"/>
    </fieldset>
</form>
