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

<form:form id="form" method="post" action="/create" modelAttribute="modelBean" cssClass="cleanform">
    <div class="header">
        <h2>Create model</h2>
        <c:if test="${not empty message}">
                <div id="message" class="success">${message}</div>	
        </c:if>
        <s:bind path="*">
                <c:if test="${status.error}">
                        <div id="message" class="error">Form has errors</div>
                </c:if>
        </s:bind>
    </div>
    <fieldset>
        <legend>Information to identify the model</legend>
        <form:label path="name">
                Name <form:errors path="name" cssClass="error" />
        </form:label>
        <form:input path="name" />
    </fieldset>
    <fieldset>
        <legend>Type of model to create</legend>
        <form:label path="type">
            Type (select one)
        </form:label>
        <%
        Set list = ModelsBuilder.getTypes();
        request.setAttribute("list",list);
        %>
        <form:select path="type" items="${requestScope['list']}" />
    </fieldset>
    <fieldset>
        <legend>Source data of model</legend>
        <form:label path="source">
            Select one source data
        </form:label>
        <form:select path="source">
            <form:option value="database">Database</form:option>
            <form:option value="hssf">Excel 95</form:option>
            <form:option value="xssf">Excel 2007</form:option>
        </form:select>
    </fieldset>    
    <p><button type="submit">Create</button></p>        
</form:form>