(function() {

    var globalScope = this,
        Chain = function() {};

    Chain.prototype = {
        onend: null,
        onfail: null,
        onwalk: null,
        fnList: [],
        
        /**
         * Add chain item.
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