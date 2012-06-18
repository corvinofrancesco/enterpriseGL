<!DOCTYPE html PUBLIC 
	"-//W3C//DTD XHTML 1.1 Transitional//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@taglib prefix="decorator" uri="http://www.opensymphony.com/sitemesh/decorator" %>
<%@taglib prefix="page" uri="http://www.opensymphony.com/sitemesh/page" %>
<%@taglib prefix="s" uri="/struts-tags" %>

<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>

    <title><decorator:title default="Books"/></title>

    <link href="<s:url value='/styles/main_1.css'/>" rel="stylesheet" type="text/css" media="all"/>
    <!--[if lte IE 6]>
    <link rel="stylesheet" type="text/css" href="<s:url value='/styles/ie6_or_less.css'/>" />
    <![endif]-->
    <script type="text/javascript" src="<s:url value='/styles/js/common.js'/>" ></script>
    <link href="<s:url value='/struts/niftycorners/niftyCorners.css'/>" rel="stylesheet" type="text/css"/>
    <link href="<s:url value='/struts/niftycorners/niftyPrint.css'/>" rel="stylesheet" type="text/css" media="print"/>
    <script language="JavaScript" type="text/javascript" src="<s:url value='/struts/niftycorners/nifty.js'/>"></script>
	<script language="JavaScript" type="text/javascript">
        window.onload = function(){
            if(!NiftyCheck()) {
                return;
            }
            // perform niftycorners rounding
            // eg.
            // Rounded("blockquote","tr bl","#ECF1F9","#CDFFAA","smooth border #88D84F");
        }
    </script>

    <!-- ajaxtags -->
    <script type="text/javascript" src="<s:url value='/ajaxtags/js/prototype.js' />"></script>
    <script type="text/javascript" src="<s:url value='/ajaxtags/js/scriptaculous/scriptaculous.js' />"></script>
    <script type="text/javascript" src="<s:url value='/ajaxtags/js/overlibmws/overlibmws.js' />"></script>
    <script type="text/javascript" src="<s:url value='/ajaxtags/js/ajaxtags.js' />"></script>
    <!-- defaults for Autocomplete and displaytag -->
    <link type="text/css" rel="stylesheet" href="<s:url value='/css/ajaxtags.css'/>" />
    <link type="text/css" rel="stylesheet" href="<s:url value='/css/displaytag.css'/>" />

    <decorator:head/>
</head>
<body id="type-b">
    <div id="wrap">
        <div id="header" class="clearfix">
            <div id="site-name"><s:text name="application.title.value" /></div>
            <!-- menu principale della pagine -->
            <%@ include file="menu.jsp"%>

        </div>
        
        <div id="content-wrap" class="clearfix">
            <div id="utility">
                <!-- sezione laterale sinistra delle pagine -->
                <%@include file="local.jsp" %>
            </div>

            <div id="content">
            	<decorator:body/>
                <hr />
            </div>
        </div>                
    </div>
</body>
</html>
