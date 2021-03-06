
	var app = angular.module('youtubeApp', ['ngSanitize','ngPassword', 'ngMessages', 'ngRoute', 'angularCSS']);


	app.config(['$routeProvider' ,function($routeProvider) {
		$routeProvider

			.when('/', {
				templateUrl : 'pages/home.html',
				css:'css/home.css'

			})
			.when('/login', {
				templateUrl : 'pages/login.html',
                controller: 'loginController',
				css:'css/login.css'

			})
			.when('/register', {
				templateUrl : 'pages/register.html',
				controller: 'registerController',
				css:'css/register.css'
			})
			.when('/myvideos', {
				templateUrl : 'pages/myvideos.html',
				controller: 'myVideoController',
				css:'css/myvideo.css'


			})
	}]);

	app.run(function($rootScope,$http){
		$http({
			method: 'GET',
			url: '/isLogedIn'
		}).then(function(response){
				$rootScope.isLogedIn=response.data.logged
			},
			function(){
			$rootScope.isLogedIn=false;
		})
		$rootScope.isLogedIn=false;
	})


	//app.controller('registerController', function($route, $scope, $location ,$http,$rootScope) {
	//	$scope.failedLog = false;
    //
	//	$scope.submit = function(){
	//		$http({
	//			method: 'POST',
     //           url: '/register',
	//			data: $scope.user
	//		}).then(function(response) {
	//			if(response.data.message=="User validation failed"){
	//				$scope.failedLog= true;
	//			}else{
	//				if(response.data.logged){
	//					$rootScope.isLogedIn=true;
	//					$location.path('/myvideos');
	//				}else{
	//					$scope.failedLog = true;
	//				}
	//			}
	//		}, function() {
	//		}
	//		);
	//	}
	//});
    //
    //
	//app.controller('myVideoController',function($sce,$route,$scope,$http,$rootScope,$location){
	//	$rootScope.thisUser = {};
	//	$rootScope.videos = [];
	//	$scope.videopopup=false;
	//	$scope.editpopup=false;
	//	$scope.iframeLink ={src:'https://www.youtube.com/embed/gC0oVdppr5A'};
	//	$scope.invalidUrl = false;
	//	$scope.invalidEditUrl = false;
    //
    //
    //
    //
	//	$scope.trustSrc = function(src) {
	//		return $sce.trustAsResourceUrl(src);
	//	}
    //
	//	$scope.preEditFunction = function($event){
    //
	//		var that= $event.target;
	//		var id = that.attributes['id'].value;
	//		$scope.thisVideoId = id;
	//		$scope.editpopup=true;
    //
	//	}
    //
	//	$scope.playVideo = function($event) {
	//		var that= $event.target;
	//		var id = that.attributes['vidoclicked'].value;
	//		$scope.iframeLink = {src: 'https://www.youtube.com/embed/'+$scope.youtube_parser(id)}
	//		console.log($scope.iframeLink)
	//	}
    //
    //
    //
    //
	//	$scope.removeFunction = function($event){
	//		var that= $event.target;
	//		var id = that.attributes['theid'].value;
	//		var data ={id:id};
	//		$http.post('/removeVideo',data).then(function() {
	//			lookForVideos();
	//		}, function(){
    //
	//		})
	//	}
    //
    //
    //
	//	$scope.editVideo = function () {
	//		var link = $scope.viddlink;
	//		var video_id = $rootScope.youtube_parser(link);
	//		var url = 'https://www.youtube.com/watch?v='+video_id
	//		if(!validateYouTubeUrl(link)){
	//			$.getJSON('https://noembed.com/embed',
	//				{format: 'json', url: url} ,function(data){
	//					var sentData = {
	//						'name':data.title,
	//						'link':link,
	//						'thumb': video_id,
	//						'id':$scope.thisVideoId
	//					}
    //
	//					$http.post('/editVideo',sentData).then(function(res) {
	//						lookForVideos();
	//					}, function(){
    //
	//					})
	//				});
	//		}else{
    //
	//			$scope.invalidEditUrl = true;
	//			$scope.videopopup=true;
	//			return;
	//		}
    //
    //
    //
	//	}
    //
	//	$rootScope.youtube_parser = function(url){
    //
	//		var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
	//		var match = url.match(regExp);
	//		return (match&&match[7].length==11)? match[7] : false;
	//	}
    //
    //
	//	function lookForVideos(){
	//		$http({
	//			method: 'GET',
	//			url: '/myvideos'
	//		}).then(function(response) {
	//			if(!response.data.videos){
	//			$rootScope.thisUser=response.data;
	//			$rootScope.videos = [];
	//			}else{
	//				$rootScope.thisUser=response.data;
	//				$rootScope.videos = response.data.videos;
	//				$scope.iframeLink ={src:'https://www.youtube.com/embed/'+$rootScope.videos[0].videothumb};
	//			}
    //
	//		}, function() {
	//			$location.path('/')
	//		});
	//	}
    //
	//	if($rootScope.isLogedIn){
	//		lookForVideos()
	//	}
    //
	//	function validateYouTubeUrl(url) {
	//		if (url != undefined || url != '') {
	//			var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
	//			var match = url.match(regExp);
	//			if (match && match[2].length == 11) {
	//				return false;
	//			}
	//			else {
	//				return true;
	//			}
	//		}
	//	}
    //
	//	$scope.addVideo = function () {
	//		var link = $scope.vidlink ;
	//		var video_id=$rootScope.youtube_parser(link);
	//		var url = 'https://www.youtube.com/watch?v='+video_id
    //
	//		if(!validateYouTubeUrl(link)){
	//			$.getJSON('https://noembed.com/embed',
	//				{format: 'json', url: url} ,function(data){
	//					var sentData = {
	//						'link':link,
	//						'name': data.title,
	//						'img':video_id
	//					}
    //
	//					$http.post('/addvideo',sentData).then(function(res) {
	//						lookForVideos();
	//					}, function(){
    //
	//					})
	//				});
	//		}else{
    //
	//			$scope.invalidUrl = true;
	//			$scope.videopopup=true;
	//			return;
	//		}
    //
    //
    //
	//	}
    //
    //
	//});
    //
    //app.controller('loginController',function($scope,$http,$location,$rootScope){
	//	$scope.noUser = false;
    //
	//	$scope.login = function(){
	//	$http({
	//		method: 'POST',
	//		url: '/login',
	//		data:$scope.user
	//	}).then(function (response) {
	//		if(response.data){
	//			$location.path('/myvideos');
	//			$rootScope.isLogedIn=true;
	//		}else{
	//			$scope.noUser = true;
	//		}
    //
	//	}, function(err){
	//		console.log(err)
	//	})
	//	}
    //});
    //
    //
	//app.directive('navdirective',function(){
	//	return{
	//		templateUrl: 'pages/navbar.html',
	//		restrict: 'E',
	//		controller:function($scope,$rootScope,$location,$http){
	//			$scope.logout = function(){
	//				$http({
	//					method: 'GET',
	//					url: '/logout'
	//				}).then(function(result) {
	//					$rootScope.isLogedIn=result.data.logged;
	//					$location.path('/');
	//				},	function(){
    //
	//				});
	//			}
	//		}
	//	}
	//})

