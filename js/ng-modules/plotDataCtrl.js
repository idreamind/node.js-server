/**
 * Created by dreamind on 08.09.2014.
 */
angular
    .module('GymGoal')
    .controller('plotDataCtrl', plotDataCtrl);

plotDataCtrl.$inject = ['$window', 'dataLoadService'];

function plotDataCtrl($window, dataLoadService) {
    var mv = this;

    mv.rewriteArray = rewriteArray;
    mv.stepArr = stepArr;
    mv.prepareData = prepareData;
    mv.numberValidation = numberValidation;
    mv.goalPoint = goalPoint;
    mv.gridArrBuilder = gridArrBuilder;
    mv.validation = validation;
    mv.inputInitialization = inputInitialization;
    mv.handleGoalPoin = handleGoalPoin;
    mv.svgInitialization = svgInitialization;
    mv.changePlotData = changePlotData;
    mv.stepWatcher = stepWatcher;
    mv.verticalWatcher = verticalWatcher;
    mv.toggle = toggle;

    mv.step = 50;
    mv.hmax = 200;
    mv.elem = document.getElementById("plot-view-svg");
    mv.svgHeight = parseFloat($window.getComputedStyle(mv.elem, null).height);
    mv.svgWidth = parseFloat($window.getComputedStyle(mv.elem, null).width);

    // Scaling data in array in according with the View | mv
    function rewriteArray(arr) {
        var outArr = [],
            iter = 0;

        for (var i = 0; i < arr.length; i++) {
            var numb = parseFloat(arr[i]);
            if (!isNaN(numb)) {
                outArr[iter] = mv.svgHeight - numb / mv.hmax * 100;
                iter = iter + 1;
            }
        }
        return outArr;
    }

    // Build the steps array | mv
    function stepArr(step_, length) {
        var steps = [];
        for (var i = 0; i < length; i++) {
            steps[ i ] = step_ * i;
        }
        return steps;
    }

    // Build the points array for the svg-view | mv
    function prepareData(arr1, arr2) {
        var m = 0,
            n = 0,
            arr_ = [];
        for (var i = 0; i < ( arr1.length + arr2.length ); i++) {
            if (i % 2) {
                arr_[ i ] = arr1[ m ];
                m++;
            } else {
                arr_[ i ] = arr2[ n ];
                n++;
            }
        }
        arr_ = arr_.join(" ");
        arr_ = String(arr_);
        return arr_;
    }

    // The validation function | mv
    function numberValidation(str, arg) {
        var reg1 = /[^0-9, ^\s, ^., ^,]/ig,
            reg2 = /\s{2,}/g,
            reg3 = /,/g;

        document.getElementById(arg).style.borderColor = "white";
        var nstr = str.replace(reg1, function (str, p1, p2, offset, s) {
            document.getElementById(arg).style.borderColor = "crimson";
            return "";
        });
        var mstr = nstr.replace(reg2, " ");
        return mstr.replace(reg3, ".");
    }

    // The goal-point management | mv
    function goalPoint(goal, date) {
        var correctGoal = mv.svgHeight - goal / mv.hmax * 100
        var correctDate = date * mv.step;
        return [ correctGoal, correctDate ];
    }

    // The Grid Array Builder | mv
    function gridArrBuilder() {
        var gridArr = [];
        for (var i = 1; i <= mv.svgWidth / 10; i++) {
            var arg = i;
            gridArr[ i - 1 ] = arg.toString();
        }
        return gridArr;
    }

    // The wrapper for the validation function | mv
    function validation(arg) {
        mv.inputData[arg] = mv.numberValidation(mv.inputData[arg], arg);
    }

    // The input initialization method | mv
    function inputInitialization() {
        mv.vGridArr = mv.gridArrBuilder();

        var data_ = dataLoadService.getSData();                    //*********************************************
        console.log( "********* Data from:" + data_ );                //*********************************************

        return initData = {
            "weight": "0 50  200 56 80  0 128 111 0",
            "fat": "0 98  360 10 175 0 12  80  0",
            "water": "0 123 64  98 46  0 48  97  0",
            "goal": "75",
            "when": "10"
        };
    };

    // Goal point handler | mv
    function handleGoalPoin() {
        var goal_ = mv.goalPoint(mv.inputData.goal, mv.inputData.when);
        mv['goal'] = goal_[ 0 ];
        mv['when'] = goal_[ 1 ];
    }

    // The SVG initialization method | mv
    function svgInitialization() {
        var initArr = mv.inputInitialization();

        for (var key in initArr) {
            var preArg = mv.rewriteArray(initArr[key].split(" "));
            var stepsArray = mv.stepArr(mv.step, preArg.length);

            mv[ key ] = mv.prepareData(preArg, stepsArray);
        }
        ;
        mv.handleGoalPoin();
        mv.goalClass = 'plot-point';
        mv.showclick = 'true';  ///< True and the div will be hide
    };

    // The plot and input data binding method | mv
    function changePlotData(arg) {
        var preArg = mv.rewriteArray(mv.inputData[arg].split(" "));
        var stepsArray = mv.stepArr(mv.step, preArg.length);
        // Prepare data:
        mv[ arg ] = mv.prepareData(preArg, stepsArray);
        // Goal point handler:
        mv.handleGoalPoin();
    };

    // The horizontal plot step watcher | mv
    function stepWatcher() {
        mv.step = mv.settingsData.h_range;
        mv.changePlotData('weight');
        mv.changePlotData('fat');
        mv.changePlotData('water');

        mv.handleGoalPoin()
    }

    // The vertical step plot watcher | mv
    function verticalWatcher() {
        mv.hmax = 250 - mv.settingsData.v_range;
        mv.stepWatcher();
    }

    // Toggle "arg", where "arg" - any ng-model | mv
    function toggle(arg) {
        if ( mv[arg]) {
            mv[arg] = false;
        } else {
            mv[arg] = true;
        }
    }
};