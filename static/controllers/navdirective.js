angular.module('youtubeApp').directive('navdirective',function(){
    return{
        templateUrl: '../pages/navbar.html',
        restrict: 'E',
        controller:function($scope,$rootScope,$location,$http){
            $scope.logout = function(){
                $http({
                    method: 'GET',
                    url: '/logout'
                }).then(function(result) {
                    $rootScope.isLogedIn=result.data.logged;
                    $location.path('/');
                },	function(){

                });
            }
        }
    }
})

