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
        <form:form action="/create">
            <fieldset>
                <div class="form-row">
                    <label for="name">Nome da assegnare al modello:</label>
                    <span class="input"><input type="text" name="name" /></span>
                </div>
                <div class="form-row">
                    <label for="name">Tipo di modello</label>
                    <span class="input"><select name="typeOfModel" ></select></span>
                </div>
                <div class="form-buttons">
                    <div class="button">
                        <input type="submit" id="save" name="_eventId_save" value="Crea"/>
                        <input type="submit" name="_eventId_cancel" value="Cancel"/>          
                    </div>    
                </div>
            </fieldset>
        </form:form>
    
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
                        ${model.typeModel.tables.size}
                    </c:if>                
                </td>
                <td>Visualizza - Modifica ${model.name}</td> 
                <td>
                    <a href="${flowExecutionUrl}&_eventId=editAddress&addressId=${address.id}" >Edit</a>
                    <a href="${flowExecutionUrl}&_eventId=deleteAddress&addressId=${address.id}" >Elimina</a>
                </td>
        </tr>
        </c:forEach>
        </table>        
        </c:if>
            
        <a href='<c:url value="/create" />' >Create a new model</a>    
    </body>
</html>
