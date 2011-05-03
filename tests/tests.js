var tests = {
    _: {
        a: 5
    },
    equals: function() {
        assert(this.a).equals(5);
    },
    not: function() {
        assert(this.a).not().equals(6);
    },
    doubleNot: function() {
        assert(this.a).not().not().equals(5);
    },
    between: function() {
        assert(this.a).between(0, 10); // [0, 10]
        assert(this.a).between(0); // [0, [
        assert(this.a).between(null, 10); // ], 10]
        assert(-5).between(null, 10); // ], 10]
    },
    isDefined: function() {
        assert(this.a).isDefined();
    },
    is: function() {
        assert(this.a).is('number');
        assert(this.a).is('array', 'number');
    },
    run: function(output) {
        for(var k in this) {
            var v = this[k];
            
            if(k != 'run' && k != '_') {
                try {
                    v.apply(this._);
                } catch(e) {
                    output('Test "' + k + '" failed! ' + e);
                }
            }
        }
    }
};
