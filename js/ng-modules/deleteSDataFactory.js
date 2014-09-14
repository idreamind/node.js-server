
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
        return $http.post('/server', {delete: 'all'})
            .then(getDataComplete)
            .catch(getDataFailed);

        function getDataFailed( error ) {
            console.log('Failed to deleteAll in deleteSDataService' + error.data);
        }
    }

    function deleteLatest() {
        return $http.post('/server', {delete: 'latest'})
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

