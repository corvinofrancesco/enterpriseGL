/* 
 * @description Plugin per integrare enterprise-client con jquery
 * 
 */
(function($)
{
    var settings = {
        text : 'Hello World'
    };

    var methods = {
        /**
         * Some kind of constructor
         * @param options initial options
         */
        init : function(options)
        {
            if (options) {
                $.extend(settings, options);
            }
        },

        /**
         * Takes the selected elements and append a new SPAN tag to them with the text 'Hello World'
         * @param options change the text which will be inserted here
         * @return the selected and modified elements for jquery chaining feature
         */
        createHelloWorldSpanTags : function(options)
        {
            var localSettings = {};
            $.extend(localSettings, settings, options);

            return this.each(function() {

                // creating a span tag and append it to the input elements of the initially jquery selector
                $('<span>').appendTo($(this)).text(localSettings.text);

            });
        }
    };

    /**
     * Namespace method for this plugin
     * @param method
     * @return the selected and modified elements for jquery chaining feature
     */
    $.fn.helloWorld = function( method ) {

        // Method calling logic
        if ( methods[method] ) {
            return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.helloWorld' );
        }
    };

})(jQuery);

