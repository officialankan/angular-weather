(function() {
	var weatherLund = angular.module('lund-directives', []);
	
	weatherLund.directive("navTabs", function() {
		return {
			directive: 'E',
			templateUrl: "nav-tabs.html",
			controller: function() {
				this.tab = 1;
				this.selectTab = function(setTab) {
					this.tab = setTab;
				};	
				this.isSelected = function(checkTab) {
					return this.tab === checkTab;
				};
			},
			controllerAs: 'panel'
		};
	});

	weatherLund.directive("teamView", function() {
		return {
			restrict: 'E',
			templateUrl: "team-view.html",
			controller: function($scope) {
				$scope.members = [
				{
					name: 'Anders Retzner',
					title: 'Student',
					img: 'img/anders.jpg',
					email: 'anders@retzner.se',
					twitter: 'anksvans',
					linkedin: 'https://se.linkedin.com/pub/anders-retzner/bb/351/10'
				},
				{
					name: 'Carl Retzner',
					title: 'Forward Deployed Engineer',
					img: 'img/carl.jpg',
					email: 'carl@retzner.se',
					twitter: 'krettan',
					linkedin: 'https://se.linkedin.com/pub/carl-retzner/54/26b/855'
				},
				{
					name: 'Charlotte Retzner',
					title: 'Adj. adjunkt',
					img: 'img/charlotte.jpg',
					email: 'charlotte@retzner.se',
					linkedin: 'https://se.linkedin.com/pub/charlotte-retzner/21/abb/353/sv'
				},
				{
					name: 'Lars Thufvesson',
					title: 'Senior Analyst',
					img: 'img/lars.jpg',
					email: 'lars.thufvesson@lsn.se',
					linkedin: 'https://se.linkedin.com/pub/lars-thufvesson/a1/813/3ab/sv'
				},
				{
					name: 'Diego "Dalle" Dali',
					title: 'Head of Security',
					img: 'img/dalle.jpg'
				}
				];
			}
		};
	});
	weatherLund.directive("weekView", function() {
		return {
			restrict: 'E',
			templateUrl: "week-view.html"
		};
	});
	weatherLund.directive("monthView", function() {
		return {
			restrict: 'E',
			templateUrl: "month-view.html",
			controller: function ($scope) {
				$scope.dates = $scope.month.map(function (d) {
					return d.Date;
				});

				$scope.rainy_days = $scope.month.map(function (d) {
					return d.RainDays == "" ? 0 : parseInt(d.RainDays);
				});
				$scope.rain = $scope.month.map(function (d) {
					return d.Rain == "" ? 0 : parseInt(d.Rain);
				});

				var options = {
					title: {
						text: 'Rain and Rain Days per Month'
					},
					xAxis: [{
						categories: $scope.dates,
					}],
					yAxis: [
						{
							title: {
								text: 'Rain'
							},
							min: 0,
							labels: {
								formatter: function () {
									return this.value + " (mm)";
								}
							}
						},
						{
							title: {
								text: 'Rain Days'
							},
							min: 0,
							opposite: true
						}
					],
					tooltip: {
						shared: true
					},
					series: [
						{
							name: 'Rain',
							data: $scope.rain,
							yAxis: 0,
							type: 'spline',
							tooltip: {
                valueSuffix: ' mm'
	            }
						},
						{
							name: 'Rainy Days',
							data: $scope.rainy_days,
							yAxis: 1,
							type: 'column',
							tooltip: {
	              valueSuffix: ' day(s)'
	            }
						}
					]
				};
				$('#chart').highcharts(options);
			}
		};
	});
	weatherLund.directive("infoView", function() {
		return {
			restrict: 'E',
			templateUrl: "info-view.html"
		};
	});
	weatherLund.directive("latestView", function() {
		return {
			restrict: 'E',
			templateUrl: "latest-view.html"
		};
	});

})();