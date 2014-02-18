(function() {

    var globalScope = this,
        Chain;

    /**
     * Chain - is extremely small JavaScript class that can help you to create chain of async calls.
     * @author Maslakov Alexander <jmas.ukraine@gmail.com>
     * @class Chain
     * @name Chain
     * @constructor
     * @property {Function} onend Function that will be called in the end of chain
     * @property {Function} onfail Function that will be called when you execute fail() function
     * @property {Function} onwalk Function that will be called when you execute walk() function
     * @property {array} fnList Array of chain functions what added by then() function
     */
    Chain = function() {};

    /**
     * Function that will be called in the end of chain
     * @public
     * @type Function
     * @memberOf Chain
     */
    Chain.prototype.onend = null;
    
    /**
     * Function that will be called when you execute fail() function
     * @public
     * @type Function
     * @memberOf Chain
     */
    Chain.prototype.onfail = null;
    
    /**
     * Function that will be called when you execute walk() function
     * @public
     * @type Function
     * @memberOf Chain
     */
    Chain.prototype.onwalk = null;
    
    /**
     * Array of chain functions what added by then() function
     * @private
     * @type array
     * @memberOf Chain
     */
    Chain.prototype.fnList = [];
    
    /**
     * Add chain item.
     * @function
     * @public
     * @memberOf Chain
     * @throws {Error} If fn is not instance of Function
     * @param {Function} fn Chain function
     * @return {Chain}
     */
    Chain.prototype.then = function(fn)
    {
        if (! fn instanceof Function) {
            throw new Error('fn is not a function!');
        }

        this.fnList.push(fn);
        
        return this;
    };

    /**
     * Walk to next chain item.
     * @function
     * @public
     * @memberOf Chain
     */
    Chain.prototype.walk = function()
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
    };
    
    /**
     * Send fail data.
     * @function
     * @public
     * @memberOf Chain
     */
    Chain.prototype.fail = function()
    {
        var args = Array.prototype.slice.call(arguments);

        this.onfail instanceof Function && this.onfail.apply(this, args);
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
