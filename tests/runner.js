var tests = function(setName, newTests) {
    var scope = this;
    
    if(!('testsToRun' in this)) {
        this.testsToRun = [];
    }
    
    if(setName && newTests) {
        this.testsToRun.push({name: setName, tests: newTests});
    }
    
    var clone = function(o) {
        // http://www.andrewsellick.com/93/javascript-clone-object-function
        if(typeof(o) != 'object' || !o) {
            return o;
        }

        var newO = new Object();

        for(var i in o) {
            newO[i] = clone(o[i]);
        }

        return newO;
    }
    
    return {
        run: function(output) {
            var passedTests = 0;
            var testTotal = 0;

            for(var i = 0; i < scope.testsToRun.length; i++) {
                var model = scope.testsToRun[i];
                var testSet = model.tests;
                
                var attrs = testSet._ || {};
                delete testSet._;

                output('Running "' + model.name + '" tests');

                for(var testName in testSet) {
                    var test = testSet[testName];

                    try {
                        test.apply(clone(attrs));

                        output('%cPASSED: ' + testName, 'color: green');

                        passedTests++;
                    }
                    catch(e) {
                        output('%cFAILED: ' + testName, 'color: red');
                        output('    ' + e);
                    }

                    testTotal++;
                }
            }

            var color = passedTests == testTotal? 'green': 'red';

            output('%c' + passedTests + '/' + testTotal + ' tests passed',
                'color: ' + color);
        }
    };
};
