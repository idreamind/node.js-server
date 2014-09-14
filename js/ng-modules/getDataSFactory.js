/**
 * Created by dreamind on 12.09.2014.
 */
angular
    .module('server')
    .factory('getSDataService', getSDataService);

getSDataService.$inject = ['$http'];

function getSDataService($http) {
    return {
        getData: getData
    };

    function getData() {
        return $http.post('/server',{want: 'all'})
            .then(getDataComplete)
            .catch(getDataFailed);

        function getDataComplete(response) {
            return response.data;
        }

        function getDataFailed(error) {
            console.log('Failed to getData in getSData: ' + error.data);
        }
    }
}