/**
 * Created by dreamind on 11.09.2014.
 */
angular
    .module('GymGoal')
    .factory('dataLoadService', dataLoadService);

dataLoadService.$inject = ['getSDataService', 'appendSDataService', 'deleteSDataService'];

function dataLoadService(getSDataService, appendSDataService, deleteSDataService) {
    return {
        getSData: getSData,
        appendSData: appendSData,
        rewriteSData: rewriteSData,
        deleteSData: deleteSData,
        deleteLatestSData: deleteLatestSData
    };

    var dataFromServer = 'Nothing to display';

    function getSData() {
        var data_ = getSDataService.getData()
            .then(function (data) {
                if (data) {
                    dataFromServer = data;
                } else {
                    dataFromServer = "Nothing to display after the getData";
                }
                return dataFromServer;
            });
        return data_;
    }

    function appendSData() {
        var data_ = appendSDataService.appendData(dataToServer)
            .then(function (data) {
                if (data) {
                    dataFromServer = data;
                } else {
                    dataFromServer = "Nothing to display after the appendData";
                }
                return dataFromServer;
            });
        return data_;
    }

    function rewriteSData() {
        var data_ = appendSDataService.rewriteData(dataToServer)
            .then(function (data) {
                if (data) {
                    dataFromServer = data;
                } else {
                    dataFromServer = "Nothing to display after the rewriteData";
                }
                return dataFromServer;
            });
        return data_;
    }

    function deleteSData() {
        var data_ = deleteSDataService.deleteAll()
            .then(function (data) {
                if (data) {
                    dataFromServer = data;
                } else {
                    dataFromServer = "Nothing to display after the deleteAll";
                }
                return dataFromServer;
            });
        return data_;
    }

    function deleteLatestSData() {
        var data_ = deleteSDataService.deleteLatest()
            .then(function (data) {
                if (data) {
                    dataFromServer = data;
                } else {
                    dataFromServer = "Nothing to display after the deleteLatest";
                }
                return dataFromServer;
            });
        return data_;
    }
}