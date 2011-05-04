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

                output('<div>Running "' + model.name + '" tests</div>');

                for(var testName in testSet) {
                    var test = testSet[testName];

                    try {
                        test.apply(clone(attrs));

                        output('<div class="passed">PASSED: ' + testName + '</div>');

                        passedTests++;
                    }
                    catch(e) {
                        output('<div class="failed">FAILED: ' + testName + '</div>');
                        output('    ' + e);
                    }

                    testTotal++;
                }
            }

            var passClass = passedTests == testTotal? 'passed': 'failed';

            output('<div class="' + passClass + '">' + passedTests + '/' + testTotal + ' tests passed</div>');
        }
    };
};
