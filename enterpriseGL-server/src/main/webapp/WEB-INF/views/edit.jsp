<%-- 
    Document   : edit
    Created on : 12-lug-2012, 16.06.49
    Author     : Francesco Corvino
--%>

<%@page contentType="text/html" pageEncoding="windows-1252"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=windows-1252">
        <title>Edit model</title>
    </head>
    <body>
        <h1>Hello World!</h1>

        <form method="post" action="/form" enctype="multipart/form-data">
            <input type="text" name="name"/>
            <input type="file" name="file"/>
            <input type="submit"/>
        </form>
        
    </body>
</html>
