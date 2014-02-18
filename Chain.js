(function() {

    var globalScope = this,
        Chain;

    /**
     * Chain class.
     * @class Chain
     * @property {Function} onend Function that will be called in the end of chain
     * @property {Function} onfail Function that will be called when you execute fail() function
     * @property {Function} onwalk Function that will be called when you execute walk() function
     * @property {array} fnList Array of chain functions what added by then() function
     */
    Chain = function() {};
    Chain.prototype = {
        /**
         * Function that will be called in the end of chain
         * @type Function
         */
        onend: null,
        
        /**
         * Function that will be called when you execute fail() function
         * @type Function
         */
        onfail: null,
        
        /**
         * Function that will be called when you execute walk() function
         * @type Function
         */
        onwalk: null,
        
        /**
         * Array of chain functions what added by then() function
         * @type array
         */
        fnList: [],
        
        /**
         * Add chain item.
         * @param {Function} fn Chain function
         */
        then: function(fn)
        {
            if (! fn instanceof Function) {
                throw new Error('fn is not a function!');
            }

            this.fnList.push(fn);
        },

        /**
         * Walk to next chain item.
         */
        walk: function()
        {
            var fn = this.fnList.shift(),
                args = Array.prototype.slice.call(arguments);
            
            this.onwalk instanceof Function && this.onwalk.apply(this, args);

            if (fn !== undefined && fn instanceof Function) {
                try {
                    fn.apply(this, args);
                } catch(error) {
                    this.fail(error);
                }
            } else {
                this.onend instanceof Function && this.onend.apply(this, args);
            }
        },
        
        /**
         * Send fail data.
         */
        fail: function()
        {
            var args = Array.prototype.slice.call(arguments);

            this.onfail instanceof Function && this.onfail.apply(this, args);
        }
    };

    // AMD support
    if (typeof define === "function" && define.amd) {
        define('Chain', [], function() {
            return Chain;
        });
    } else {
        globalScope.Chain = Chain;
    }

})();
