(function() {
	
	var weatherLund = angular.module('weatherLund', ['lund-directives']);



	weatherLund.controller('weatherLundController', function($scope, $http) {
		$scope.graphView = 0;
		$scope.loadData = function() {	
			$http.get('data/live.json')
				.then(function(res) {
					$scope.live = res.data;
				});
			$http.get('data/week.json')
				.then(function(res) {
					$scope.week = res.data;
				});
			$scope.today = new Date();
			$http.get('data/month.json')
				.then(function(res) {
					$scope.month = res.data;
				});
		};
		$scope.loadData();
		$scope.setGraph = function(value) {
			return $scope.graphView = value;
		};
	});
})();
