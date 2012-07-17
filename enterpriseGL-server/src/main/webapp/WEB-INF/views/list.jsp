<%-- 
    Document   : init
    Created on : 19-giu-2012, 12.23.02
    Author     : Francesco Corvino
--%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="s" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<c:if test="${!ajaxRequest}">
</c:if>
<form id="commandForm" class="commandForm">
    <fieldset id="body">

        <c:if test="${empty models}">
            <p>Nessun modello caricato</p>
        </c:if>

        <c:if test="${not empty models}">
            Modelli inseriti:
            <table class="search" border="3">
                <tr>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Last change</th>
                    <th>Tables</th>
                    <th>Actions</th>
                </tr>
                <c:forEach var="model" items="${models}">
                    <tr>
                        <td>${model.name}</td>
                        <td>${model.status}</td>
                        <td><fmt:formatDate value="${model.lastChange}" pattern="yyyy-MM-dd" /></td>
                        <td>
                            <c:if test="${not empty model.typeModel.tables}">
                                ${model.typeModel.tables.size()}
                            </c:if>                
                        </td>
                        <td>
                            <a href='<s:url value="/view/${model.name}" />' class="textLink">View</a>
                            <a href='<s:url value="/edit/${model.name}" />' class="textLink">Edit</a>
                            <a href='<s:url value="/delete/${model.name}" />' class="textLink">Delete</a>
                        </td>
                    </tr>
                </c:forEach>
            </table>        
        </c:if>
    
    </fieldset>
    <span><b><a href='<c:url value="/create" />' class="textLink">CREATE A NEW MODEL</a></b></span>
</form>
    