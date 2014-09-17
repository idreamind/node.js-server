/**
 * Created by dreamind on 11.09.2014.
 */

angular
    .module('GymGoal')
    .controller('dataLoadController', dataLoadController);

dataLoadController.$inject = ['getSDataService', 'appendSDataService', 'deleteSDataService'];

function dataLoadController(getSDataService, appendSDataService, deleteSDataService) {
    var mv = this;

    mv.getSData = getSData;
    mv.appendSData = appendSData;
    mv.rewriteSData = rewriteSData;
    mv.deleteSData = deleteSData;
    mv.deleteLatestSData = deleteLatestSData;

    function getSData() {
        getSDataService.getData()
            .then(function(data) {
                if( data ) {
                    mv.dataFromServer = data;
                } else {
                    mv.dataFromServer = "Nothing to display after the getData";
                }
                return mv.dataFromServer;
            });
    }

    function appendSData() {
        appendSDataService.appendData( mv.dataToServer )
            .then(function(data) {
                if( data ) {
                    mv.dataFromServer = data;
                } else {
                    mv.dataFromServer = "Nothing to display after the appendData";
                }
                return mv.dataFromServer;
            });
    }

    function rewriteSData() {
        appendSDataService.rewriteData( mv.dataToServer )
            .then(function(data) {
                if( data ) {
                    mv.dataFromServer = data;
                } else {
                    mv.dataFromServer = "Nothing to display after the rewriteData";
                }
                return mv.dataFromServer;
            });
    }

    function deleteSData() {
        deleteSDataService.deleteAll()
            .then(function(data) {
                if( data ) {
                    mv.dataFromServer = data;
                } else {
                    mv.dataFromServer = "Nothing to display after the deleteAll";
                }
                return mv.dataFromServer;
            });
    }

    function deleteLatestSData() {
        deleteSDataService.deleteLatest()
            .then(function(data) {
                if( data ) {
                    mv.dataFromServer = data;
                } else {
                    mv.dataFromServer = "Nothing to display after the deleteLatest";
                }
                return mv.dataFromServer;
            });
    }
}