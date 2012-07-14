<%-- 
    Document   : init
    Created on : 19-giu-2012, 12.23.02
    Author     : Francesco Corvino
--%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Home</title>
    </head>
    <body>
    
        <c:if test="${empty models}">
            <p>Nessun modello caricato</p>
        </c:if>

        <c:if test="${not empty models}">
        <table class="search">
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
                    <c:if test="${not empty model.typeModel.tables}">
                        ${model.typeModel.tables.size()}
                    </c:if>                
                </td>
                <td>Visualizza - Modifica ${model.name}</td> 
                <td>
                    <a href='<s:url value="" />' >Edit</a>
                    <a href="${flowExecutionUrl}&_eventId=deleteAddress&addressId=${address.id}" >Elimina</a>
                </td>
        </tr>
        </c:forEach>
        </table>        
        </c:if>
            
        <a href='<c:url value="/create" />' >Create a new model</a>    
    </body>
</html>
