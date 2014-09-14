/**
 * Created by dreamind on 13.09.2014.
 */

angular
    .module('server')
    .factory('appendSDataService', appendSDataService);

appendSDataService.$inject = ['$http'];

function appendSDataService($http) {
    return {
        appendData: appendData,
        rewriteData: rewriteData
    };

    function appendData( sData ) {
        var dataSend = JSON.stringify({
            want: "append",
            data: sData
        }, "", 4);
        return $http.post('/server', dataSend)
            .then(getDataComplete)
            .catch(getDataFailed);

        function getDataFailed(error) {
            console.log('Failed to appendData in appendSDataService' + error.data);
        }
    }

    function rewriteData( sData ) {
        var dataSend = JSON.stringify({
            want: "rewrite",
            data: sData
        }, "", 4);
        return $http.post('/server', dataSend)
            .then(getDataComplete)
            .catch(getDataFailed);

        function getDataFailed( error ) {
            console.log('Failed to rewriteData in appendSDataService' + error.data);
        }
    }

    function getDataComplete(response) {
        return response.data;
    }
}