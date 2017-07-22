angular.module('youtubeApp').controller('loginController',function($scope,$http,$location,$rootScope){
    $scope.noUser = false;

    $scope.login = function(){
        $http({
            method: 'POST',
            url: '/login',
            data:$scope.user
        }).then(function (response) {
            if(response.data){
                $location.path('/myvideos');
                $rootScope.isLogedIn=true;
            }else{
                $scope.noUser = true;
            }

        }, function(err){
            console.log(err)
        })
    }
});