
angular
    .module('server')
    .factory('deleteSDataService', deleteSDataService);

deleteSDataService.$inject = ['$http'];

function deleteSDataService($http) {
    return {
        deleteAll: deleteAll,
        deleteLatest: deleteLatest
    };

    function deleteAll() {
        var dataSend = JSON.stringify({
            want: "delete",
            what: "all"
        }, "", 4);
        return $http.post('/server', dataSend)
            .then(getDataComplete)
            .catch(getDataFailed);

        function getDataFailed( error ) {
            console.log('Failed to deleteAll in deleteSDataService' + error.data);
        }
    }

    function deleteLatest() {
        var dataSend = JSON.stringify({
            want: "delete",
            what: "latest"
        }, "", 4);
        return $http.post('/server', dataSend)
            .then(getDataComplete)
            .catch(getDataFailed);

        function getDataFailed( error ) {
            console.log('Failed to deleteLatest in deleteSDataService' + error.data);
        }
    }

    function getDataComplete(response) {
        return response.data;
    }
}

