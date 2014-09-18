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

    var errorData = "Nothing to display after the request...";

    function getSData() {
        return getSDataService.getData()
            .then(function (data) {
                if (data) {
                    return data;
                } else {
                    return errorData;
                }
            });
    }

    function appendSData( dataToServer ) {
        return appendSDataService.appendData( dataToServer )
            .then(function (data) {
                if (data) {
                    return data;
                } else {
                    return errorData;
                }
            });
    }

    function rewriteSData( dataToServer ) {
        return appendSDataService.rewriteData( dataToServer )
            .then(function (data) {
                if (data) {
                    return data;
                } else {
                    return errorData;
                }
            });
    }

    function deleteSData() {
        return deleteSDataService.deleteAll()
            .then(function (data) {
                if (data) {
                    return data;
                } else {
                    return errorData;
                }
            });
    }

    function deleteLatestSData() {
        return deleteSDataService.deleteLatest()
            .then(function (data) {
                if (data) {
                    return data;
                } else {
                    return errorData;
                }
            });
    }
}