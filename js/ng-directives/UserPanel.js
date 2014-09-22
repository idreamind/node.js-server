/**
* Created by dreamind on 22.09.2014.
*/
angular
    .module('GymGoal')
    .directive('upanel', upanel);

//upanel.$inject = ['$window'];

function upanel() {
    var directive = {
        restrict: 'AEC',
        template:
            '<div id="user-panel" ng-cloak>'  +
                '<div id="user-img">' +
                    '<img src="{{upVm.userImg}}"/>' +
                '</div>' +
                '<h1>' +
                    '{{upVm.userName}}' +
                '</h1>' +
                '<div id="user-info">' +
                    '{{upVm.userInfo}}' +
                '</div>' +
            '</div>',
        link: link,
        controller: userPanelController,
        controllerAs: 'upVm',
        replace: true
    };
    return directive;

    function userPanelController() {
        var upVm = this;

        upVm.userImg = "/image/iam.jpg";
        upVm.userName = "Kostya";
        upVm.userInfo = "Nice Gym!";
    };

    function link(scope, element, attrs) {
        scope.user = "DDDDD";
        console.log('LINK: scope.userName = %i', scope.userName);
    };
}