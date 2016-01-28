angular.module('app.directives', [])

.directive('resizeHeight', ['$state', function($state) {
    return {
        link: function(scope, element) {
            scope.resize = function() {
                var minHeight = 0;
                if ($state.current.name === 'principal') {
                    element.parent().parent().parent().find('header').parent().removeClass('oculto');
                    element.parent().parent().parent().find('footer').parent().removeClass('oculto');
                    element.parent().parent().find('#menu').parent().removeClass('oculto');
                    // renderizar el tamanio del contenido central
                    element.parent().parent().find('#cuerpo').parent().removeClass('col-md-12');
                    element.parent().parent().find('#cuerpo').parent().addClass('col-md-10');
                } else if ($state.current.name === 'login') {
                    element.parent().parent().parent().find('header').parent().addClass('oculto');
                    element.parent().parent().parent().find('footer').parent().addClass('oculto');
                    element.parent().parent().find('#menu').parent().addClass('oculto');
                    // renderizar el tamanio del contenido central
                    element.parent().parent().find('#cuerpo').parent().addClass('col-md-12');
                    element.parent().parent().find('#cuerpo').parent().removeClass('col-md-10');
                }
            };
            scope.resize();
            $(window).resize(function() {
                scope.resize();
            });
        }
    };

}])
.directive('myEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.myEnter);
                });

                event.preventDefault();
            }
        });
    };
});
