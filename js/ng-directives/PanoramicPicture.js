/**
 * Created by dreamind on 20.09.2014.
 */
angular
    .module('GymGoal')
    .directive('panoramic', panoramic);

panoramic.$inject = ['$window'];

$scope.$watch('panoramic',panoramic());

function panoramic($window) {
    var d, nw, ndX, ndY;
    var directive = {
        restrict: 'AEC',
        link: link,
        template: "<figure style='position:absolute;display:block;width:100%;height:100%;left:0;top:0;overflow:hidden;padding:0;margin:0;border:none;'>"+
                  "<img style='position:absolute;display:block;height:auto;'/>"+
                  "</figure>",
        replace: true
    };
    return directive;

    // Наблюдение и манипулиорование DOM
    function link($scope, element, attrs) {

        // Задаём источник изображения:
        attrs.$observe('pictureSrc', function(value) {
            element.find('img').attr('src', value);
        });

        // Задаём ширину изображения:
        attrs.$observe('pictureWidth', function(value) {
            var w = parseFloat(value);
                d = w/ 2;
                nw = 100 + d;
            element.find('img').attr('style',   'position:absolute;display:block;height:auto;' +
                                                'width:' + nw + '%;' +
                                                'top:-'+ d +'%;' +
                                                'left:-' + d +'%;' );
        });

        // Шевелим картинку по Ох
        attrs.$observe('setX', function(value) {
            var innerW = $window.innerWidth,
                dX = 100 * parseInt(value)/innerW;
            ndX = d - dX;
                element.find('img').attr('style',   'position:absolute;display:block;height:auto;' +
                'width:' + nw + '%;' +
                'top:-'+ ndY +'%;' +
                'left:-' + ndX +'%;' );
        });

        // Шевелим картинку по Оy
        attrs.$observe('setY', function(value) {
            var innerH = $window.innerHeight,
                dY = 100 * parseInt(value)/innerH;
            ndY = d + dY;
            element.find('img').attr('style',   'position:absolute;display:block;height:auto;' +
                'width:' + nw + '%;' +
                'top:-'+ ndY +'%;' +
                'left:-' + ndX +'%;' );
        });
    }
}