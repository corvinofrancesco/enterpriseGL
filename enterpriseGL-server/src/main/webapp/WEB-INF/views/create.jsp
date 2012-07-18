<%-- 
    Document   : create
    Created on : 12-lug-2012, 16.06.32
    Author     : Francesco Corvino
--%>
<%@page import="java.util.Set"%>
<%@page import="unisalento.fcorvino.model.ModelsBuilder"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="s" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
<%@ page session="false" %>

<form:form id="commandForm" method="post" action="/create" modelAttribute="modelBean" class="commandForm">
    <fieldset id="body">
        <c:if test="${not empty message}">
            <div id="message" class="success">${message}</div>	
        </c:if>
        <s:bind path="*">
            <c:if test="${status.error}">
                <div id="message" class="error">Form has errors</div>
            </c:if>
        </s:bind>
        <fieldset>
            <form:label path="name">
                Name <form:errors path="name" cssClass="error" />
            </form:label>
            <form:input path="name" />
        </fieldset>
        <fieldset>
            <form:label path="type">
                Type (select one)
            </form:label>
            <%
                Set list = ModelsBuilder.getTypes();
                request.setAttribute("list", list);
            %>
            <form:select path="type" items="${requestScope['list']}" />
        </fieldset>
        <input type="submit" id="login" value="Create"/>
        <input type="submit" id="login" value="Cancel"/>
    </fieldset>
</form:form>

<script type="text/javascript">
    $(document).ready(function() {
        $('<input type="hidden" name="ajaxUpload" value="true" />').insertAfter($("#commandForm"));
        $("#commandForm").ajaxForm({ success: function(html) {
                configuration.menu.changeWith(html);
            }
        });
    });
</script>	
