<%-- 
    Document   : init
    Created on : 19-giu-2012, 12.23.02
    Author     : Francesco Corvino
--%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="s" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<c:if test="${!ajaxRequest}">
<html>
<head>
	<title>Home</title>
	<link href="<c:url value="/resources/form.css" />" rel="stylesheet"  type="text/css" />		
	<script type="text/javascript" src="<c:url value="/resources/jquery/1.6/jquery.js" />"></script>
	<script type="text/javascript" src="<c:url value="/resources/jqueryform/2.8/jquery.form.js" />"></script>	
</head>
<body>
</c:if>
    <c:if test="${empty models}">
        <p>Nessun modello caricato</p>
    </c:if>

    <c:if test="${not empty models}">
    <table class="search" border="3">
        <tr>
            <th>Model name</th>
            <th>Status</th>
            <th>Last change</th>
            <th>Numbers of requred tables</th>
            <th>Actions</th>
        </tr>
    <c:forEach var="model" items="${models}">
    <tr>
            <td>${model.name}</td>
            <td>${model.status}</td>
            <td>${model.lastChange}</td>
            <td>
                ${model.typeModel.typeId}:
                <c:if test="${not empty model.typeModel.tables}">
                    ${model.typeModel.tables.size()}
                </c:if>                
            </td>
            <td>
                <a href='<s:url value="/view/${model.name}" />' >View</a>
                <a href='<s:url value="/edit/${model.name}" />' >Edit</a>
                <a href='<s:url value="/delete/${model.name}" />' >Delete</a>
            </td>
    </tr>
    </c:forEach>
    </table>        
    </c:if>
            
    <a href='<c:url value="/create" />' >Create a new model</a>    
<c:if test="${!ajaxRequest}">
</body>
</html>
</c:if>