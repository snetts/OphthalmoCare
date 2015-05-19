'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication', 'Menus', '$state','CoreProperties','ActionsHandler','Toolbar',
    function ($scope, Authentication, Menus, $state, CoreProperties, ActionsHandler, Toolbar) {
        $scope.authentication = Authentication;
        $scope.isCollapsed = false;
        $scope.menu = Menus.getMenu('topbar');
        $scope.toolbarCommands=function(){
            return Toolbar.getToolbarCommands();
        };
        $scope.pageTitle=$state.current.title||null;
        $scope.showToolBar = ($state.current.url != "/"&& $state.current.url!='/signin');
        $scope.pageSubTitle=function(){
            return CoreProperties.getPageSubTitle();
        };

        $scope.toggleCollapsibleMenu = function () {
            $scope.isCollapsed = !$scope.isCollapsed;
        };

        // Collapsing the menu after navigation
        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if(toState.title){
                $scope.pageTitle=toState.title;
            }
            $scope.showToolBar = (toState.url != "/"&& toState.url!='/signin');
            $scope.isCollapsed = false;
        });

        $scope.fireCommand=function(command){
            console.log('fire')
            console.log(command);
            ActionsHandler.fireAction(command, null);
        }
    }
]);
