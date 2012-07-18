<%-- 
    Document   : search
    Created on : 18-lug-2012, 14.56.49
    Author     : Francesco Corvino
--%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="s" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>

<script type="text/javascript">
    $(document).ready(function() {
        $("#commandForm").ajaxForm({ success: function(html) {configuration.menu.changeWith(html);}});
    });
</script>	

<form:form id="commandForm" method="post" action="/search" class="commandForm">
    <fieldset id="body">
        <c:if test="${not empty message}">
            <div id="message" class="success">${message}</div>	
        </c:if>
        <fieldset>
            <label for="name">
                Name <form:errors path="name" cssClass="error" />
            </label>
            <input type="text" name="name" />
        </fieldset>
        <fieldset>
            <label for="query">
                Query <form:errors path="name" cssClass="error" />
            </label>
            <input type="text" name="query" />
        </fieldset>
        <input type="submit" id="login" value="Search"/>
        <input type="submit" id="login" value="Cancel" onclick="return configuration.menu.cancelOp();"/>
    </fieldset>
</form:form>