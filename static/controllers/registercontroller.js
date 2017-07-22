angular.module('youtubeApp').controller('registerController', function($route, $scope, $location ,$http,$rootScope) {
    $scope.failedLog = false;

    $scope.submit = function(){
        $http({
            method: 'POST',
            url: '/register',
            data: $scope.user
        }).then(function(response) {
                if(response.data.message=="User validation failed"){
                    $scope.failedLog= true;
                }else{
                    if(response.data.logged){
                        $rootScope.isLogedIn=true;
                        $location.path('/myvideos');
                    }else{
                        $scope.failedLog = true;
                    }
                }
            }, function() {
            }
        );
    }
});