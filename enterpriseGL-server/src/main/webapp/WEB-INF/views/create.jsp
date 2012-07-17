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

<html>
    <head>
        <title>Create</title>
        <link rel="stylesheet" href="<c:url value="/resources/menucss/style.css" />" />
        <script type="text/javascript" src="<c:url value="/resources/jquery/1.6/jquery.js" />"></script>
        <script type="text/javascript" src="<c:url value="/resources/jqueryform/2.8/jquery.form.js" />"></script>
        <script src="<c:url value="/resources/menucss/menuController.js"/>"></script>
    </head>
    <body>

        <div id="bar">
            <div id="container">
                <div class="commandContainer">
                    <a href="#" id="commandButton" class="commandButton"><span>Create</span><em></em></a>
                    <div style="clear:both"></div>
                    <div id="commandBox" class="commandBox">
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
                                <!--     <fieldset>
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
                                --> 
                                <input type="submit" id="login" value="Create"/>
                            </fieldset>
                        </form:form>
                    </div>
                </div>
            </div>
        </div>
