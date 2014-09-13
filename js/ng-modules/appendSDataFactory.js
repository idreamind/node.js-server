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
        return $http.post('/server', { data: sData, want: 'append'})
            .then(getDataComplete)
            .catch(getDataFailed);

        function getDataFailed(error) {
            console.log('Failed to appendData in appendSDataService' + error.data);
        }
    }

    function rewriteData( sData ) {
        return $http.post('/server', { data: sData, want: 'rewrite'})
            .then(getDataComplete)
            .catch(getDataFailed);

        function getDataFailed( error ) {
            console.log('Failed to rewriteData in appendSDataService' + error.data);
        }
    }

    function getDataComplete(response) {
        return response.data.result;
    }
}