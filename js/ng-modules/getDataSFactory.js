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

        var dataSend = JSON.stringify({
            want: "all"
        }, "", 4);

        return $http.post('/server', dataSend)
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