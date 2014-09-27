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
    mv.setDataFromServer = setDataFromServer;
    mv.saveDataToServer = saveDataToServer;
    mv.deleteLatestData = deleteLatestData;
    mv.deleteAllData = deleteAllData;
    mv.hoverDelAllBack = hoverDelAllBack;

/*--------------------------------------------------------------------------------------------------------------------*/

    mv.step = 50;
    mv.hmax = 200;
    mv.koff = 800;
    mv.lastDay = "";
    mv.elem = document.getElementById("plot-view-svg");
    mv.svgHeight = parseFloat($window.getComputedStyle(mv.elem, null).height);
    mv.svgWidth = parseFloat($window.getComputedStyle(mv.elem, null).width);

/*--------------------------------------------------------------------------------------------------------------------*/

    // Scaling data in array in according with the View | mv
    function rewriteArray(arr) {
        var outArr = [],
            iter = 0;

        for (var i = 0; i < arr.length; i++) {
            var numb = parseFloat(arr[i]);
            if (!isNaN(numb)) {
                outArr[iter] = mv.svgHeight - numb / mv.hmax * mv.koff;
                iter = iter + 1;
            }
        }
        return outArr;
    }

/*--------------------------------------------------------------------------------------------------------------------*/

    // Build the steps array | mv
    function stepArr(step_, length) {
        var steps = [];
        for (var i = 0; i < length; i++) {
            steps[ i ] = step_ * i;
        }
        return steps;
    }

/*--------------------------------------------------------------------------------------------------------------------*/

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

/*--------------------------------------------------------------------------------------------------------------------*/

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

/*--------------------------------------------------------------------------------------------------------------------*/

    // The goal-point management | mv
    function goalPoint(goal, date) {
        var correctGoal = mv.svgHeight - goal / mv.hmax * mv.koff
        var correctDate = date * mv.step;
        return [ correctGoal, correctDate ];
    }

/*--------------------------------------------------------------------------------------------------------------------*/

    // The Grid Array Builder | mv
    function gridArrBuilder() {
        var gridArr = [];
        for (var i = 1; i <= mv.svgWidth / 10; i++) {
            var arg = i;
            gridArr[ i - 1 ] = arg.toString();
        }
        return gridArr;
    }

/*--------------------------------------------------------------------------------------------------------------------*/

    // The wrapper for the validation function | mv
    function validation(arg) {
        mv.inputData[arg] = mv.numberValidation(mv.inputData[arg], arg);
    }

/*--------------------------------------------------------------------------------------------------------------------*/

    // The input initialization method | mv
    function inputInitialization() {
        mv.vGridArr = mv.gridArrBuilder();
        mv.setDataFromServer();

        return initData = {
            "weight": "",
            "fat": "",
            "water": "",
            "goal": "75",
            "when": "10"
        };
    };

/*--------------------------------------------------------------------------------------------------------------------*/

    // Goal point handler | mv
    function handleGoalPoin() {
        var goal_ = mv.goalPoint(mv.inputData.goal, mv.inputData.when);
        mv['goal'] = goal_[ 0 ];
        mv['when'] = goal_[ 1 ];
    }

/*--------------------------------------------------------------------------------------------------------------------*/

    // The SVG initialization method | mv
    function svgInitialization() {
        var initArr = mv.inputInitialization();

        for (var key in initArr) {
            var preArg = mv.rewriteArray(initArr[key].split(" "));
            var stepsArray = mv.stepArr(mv.step, preArg.length);

            mv[ key ] = mv.prepareData(preArg, stepsArray);
        };
        mv.handleGoalPoin();
        mv.goalClass = 'plot-point';
        mv.showclick = 'true';  ///< True and the div will be hide
    };

/*--------------------------------------------------------------------------------------------------------------------*/

    // The plot and input data binding method | mv
    function changePlotData(arg) {
        var preArg = mv.rewriteArray(mv.inputData[arg].split(" "));
        var stepsArray = mv.stepArr(mv.step, preArg.length);
        // Prepare data:
        mv[ arg ] = mv.prepareData(preArg, stepsArray);
        // Goal point handler:
        mv.handleGoalPoin();
    };

/*--------------------------------------------------------------------------------------------------------------------*/

    // The horizontal plot step watcher | mv
    function stepWatcher() {
        mv.step = mv.settingsData.h_range;
        mv.changePlotData('weight');
        mv.changePlotData('fat');
        mv.changePlotData('water');

        mv.handleGoalPoin()
    }

/*--------------------------------------------------------------------------------------------------------------------*/

    // The vertical step plot watcher | mv
    function verticalWatcher() {
        mv.hmax = 250 - mv.settingsData.v_range;
        mv.stepWatcher();
    }

/*--------------------------------------------------------------------------------------------------------------------*/

    // Load data from Server | mv
    function setDataFromServer() {
        dataLoadService.getSData()
            .then(function(dataFrom) {
                mv.inputData.weight = dataFrom.weight.replace(/,/g, " ");
                mv.inputData.fat = dataFrom.fat.replace(/,/g, " ");
                mv.inputData.water = dataFrom.water.replace(/,/g, " ");
                mv.inputData.goal = dataFrom.goal;
                mv.inputData.when = dataFrom.when;
                mv.daysArr = dataFrom.days.split(" ");
                mv.lastDay = dataFrom.days.split(" ");
                // Data-processing for viewer:
                mv.changePlotData('weight');
                mv.changePlotData('fat');
                mv.changePlotData('water');
            });
    }

/*--------------------------------------------------------------------------------------------------------------------*/

    function saveDataToServer() {

        var date = new Date(),
            newDay = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear(),
            newArr = mv.daysArr.join(" ") + " " + newDay,
            last = mv.lastDay;

        if( last[ last.length - 1 ] == newDay  ) {
            console.log( " Nothing to change " );
        } else {
            var dataToServer = {
                days: newArr,
                weight: mv.inputData.weight,
                fat: mv.inputData.fat,
                water: mv.inputData.water,
                goal: mv.inputData.goal,
                when: mv.inputData.when
            };

            // And server-controller:
            dataLoadService.rewriteSData(dataToServer)
                .then(function (dataFrom) {
                    mv.inputData.weight = dataFrom.weight.replace(/,/g, " ");
                    mv.inputData.fat = dataFrom.fat.replace(/,/g, " ");
                    mv.inputData.water = dataFrom.water.replace(/,/g, " ");
                    mv.inputData.goal = dataFrom.goal;
                    mv.inputData.when = dataFrom.when;
                    // Data-processing for viewer:
                    mv.changePlotData('weight');
                    mv.changePlotData('fat');
                    mv.changePlotData('water');
                });
            mv.setDataFromServer();
        }
    }

/*--------------------------------------------------------------------------------------------------------------------*/

    // Delete last append data, if it was changing in this time
    function deleteLatestData() {
        dataLoadService.deleteLatestSData()
            .then(function(dataFrom) {
                mv.inputData.weight = dataFrom.weight.replace(/,/g, " ");
                mv.inputData.fat = dataFrom.fat.replace(/,/g, " ");
                mv.inputData.water = dataFrom.water.replace(/,/g, " ");
                mv.inputData.goal = dataFrom.goal;
                mv.inputData.when = dataFrom.when;
                mv.daysArr = dataFrom.replace(/,/g, " ");
                // Data-processing for viewer:
                mv.changePlotData('weight');
                mv.changePlotData('fat');
                mv.changePlotData('water');
            });
        mv.setDataFromServer();
    }

/*--------------------------------------------------------------------------------------------------------------------*/

    // Delete all available data
    var counter = 0;
    function deleteAllData() {
        if (counter < 1) {
            mv.classes.buttonAler = "buttons special-buttons alert-special-buttons";
            mv.hoverDelAll = ". Уверен?"
            counter = 1;
        } else {
            dataLoadService.deleteSData()
                .then(function (dataFrom) {
                    mv.setDataFromServer();
                    mv.classes.buttonAler = "buttons special-buttons";
                    mv.hoverDelAll = ". Удалено."
                });
            counter = 0;
        }
    }

    function hoverDelAllBack() {
        counter = 0;
        mv.classes.buttonAler = "buttons special-buttons";
        mv.hoverDelAll = "";
    }

};