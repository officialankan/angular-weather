(function() {
	var weatherLund = angular.module('lund-directives', []);
	
	weatherLund.directive('backImg', function(){
    return function(scope, element, attrs){
        attrs.$observe('backImg', function(value) {
            element.css({
                'background-image': 'url(' + value +')',
                'background-size' : 'cover',
				'-webkit-background-size' : 'cover',
				'-moz-background-size': 'cover',
				'-o-background-size': 'cover'
            });
		});
	};
	});
	
	weatherLund.directive("navTabs", function() {
		return {
			directive: 'E',
			templateUrl: "nav-tabs.html",
			controller: function() {
				this.tab = 0;
				this.weather = false;
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
					title: 'Forward Deployed Engineer at Burt',
					img: 'img/carl.jpg',
					email: 'carl@retzner.se',
					twitter: 'krettan',
					linkedin: 'https://se.linkedin.com/pub/carl-retzner/54/26b/855'
				},
				{
					name: 'Charlotte Retzner',
					title: 'Founder and consultant at REC / Adj. adjunkt at Lund University',
					img: 'img/charlotte.jpg',
					email: 'charlotte@retzner.se',
					linkedin: 'https://se.linkedin.com/pub/charlotte-retzner/21/abb/353/sv'
				},
				{
					name: 'Lars Thufvesson',
					title: 'Senior Analyst at Yara International',
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
			templateUrl: "week-view.html",
			controller: function ($scope) {
				$scope.dates = $scope.week.map(function (d) {
					return new Date(d.Date);
				});

				$scope.temp_max = $scope.week.map(function (d) {
					return d.TempMax == "" ? 0 : parseInt(d.TempMax);
				});
				$scope.temp_min = $scope.week.map(function (d) {
					return d.TempMin == "" ? 0 : parseInt(d.TempMin);
				});

				var options_week_temp = {
					title: {
						text: 'Daily Temperature Extremes'
					},
					xAxis: [{
						categories: $scope.dates,
					}],
					yAxis: {
						title: {
								text: 'Temperature'
							},
						labels: {
							formatter: function () {
								return this.value + " (°C)";
							}
						},
						min: -40,
						max: 40
					},
					tooltip: {
						shared: true
					},
					series: [
						{
							name: 'Maximum Temperature',
							data: $scope.temp_max,
							type: 'spline',
							color: '#FF5050'
						},
						{
							name: 'Minimum Temperature',
							data: $scope.temp_min,
							type: 'spline',
							color: '#66CCFF'
						}
					]
				};
				$('#chart-week-temp').highcharts(options_week_temp);
			}		
		};
	});
	weatherLund.directive("monthView", function() {
		return {
			restrict: 'E',
			templateUrl: "month-view.html",
			controller: function ($scope) {
				$scope.dates = $scope.month.map(function (d) {
					return new Date(d.Date);
				});

				$scope.rainy_days = $scope.month.map(function (d) {
					return d.RainDays == "" ? 0 : parseInt(d.RainDays);
				});
				$scope.rain = $scope.month.map(function (d) {
					return d.Rain == "" ? 0 : parseInt(d.Rain);
				});

				var options_month_rain = {
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
				$('#chart-month-rain').highcharts(options_month_rain);
			}
		};
	});
	weatherLund.directive("infoView", function() {
		return {
			restrict: 'E',
			templateUrl: "info-view.html"
		};
	});
	weatherLund.directive("mediaView", function() {
		return {
			restrict: 'E',
			templateUrl: "media-view.html"
		};
	});
	weatherLund.directive("indexView", function() {
		return {
			restrict: 'E',
			templateUrl: "index-view.html"
		};
	});
	weatherLund.directive("latestView", function() {
		return {
			restrict: 'E',
			templateUrl: "latest-view.html",
			controller: function ($scope) {
				$scope.dates = $scope.live.map(function (d) {
					return new Date(d.Date);
				});

				$scope.temp_out = $scope.live.map(function (d) {
					return d.TempOut == "" ? 0 : parseInt(d.TempOut);
				});
				$scope.humidity_out = $scope.live.map(function (d) {
					return d.HumidityOut == "" ? 0 : parseInt(d.HumidityOut);
				});

				var options_latest_temp = {
					title: {
						text: 'Latest Temperature and Humidity Records'
					},
					xAxis: [{
						categories: $scope.dates,
					}],
					yAxis: [
						{
							title: {
								text: 'Temperature'
							},
							labels: {
								formatter: function () {
									return this.value + " (°C)";
								}
							},
							min: -40,
							max: 40
						},
						{
							title: {
								text: 'Humidity Out'
							},
							min: 0,
							max: 100,
							opposite: true
						}
					],
					tooltip: {
						shared: true
					},
					series: [
						{
							name: 'Temperature',
							data: $scope.temp_out,
							yAxis: 0,
							type: 'spline',
							tooltip: {
                valueSuffix: ' (°C)'
							}
						},
						{
							name: 'Humidity Out',
							data: $scope.humidity_out,
							yAxis: 1,
							type: 'spline',
							tooltip: {
	              valueSuffix: ' %'
						}
						}
					]
				};
				$('#chart-latest-temp').highcharts(options_latest_temp);
				
				$scope.wind_speed = $scope.live.map(function (d) {
					return d.wind_speed_mps == "" ? 0 : parseInt(d.wind_speed_mps);
				});
				$scope.wind_gust = $scope.live.map(function (d) {
					return d.wind_gust_mps == "" ? 0 : parseInt(d.wind_gust_mps);
				});
				var options_latest_wind = {
					chart: {
						type: 'spline'
					},
					title: {
						text: 'Latest Wind Recordings'
					},
					xAxis: [{
						categories: $scope.dates,
					}],
					yAxis: {
						title: {
							text: 'Wind speed (m/s)'
						},
						min: 0,
						minorGridLineWidth: 0,
						gridLineWidth: 0,
						alternateGridColor: null,
						plotBands: [{ // Light air
							from: 0.3,
							to: 1.5,
							color: 'rgba(68, 170, 213, 0.1)',
							label: {
								text: 'Light air',
								style: {
									color: '#606060'
								}
							}
						}, { // Light breeze
							from: 1.5,
							to: 3.3,
							color: 'rgba(0, 0, 0, 0)',
							label: {
								text: 'Light breeze',
								style: {
									color: '#606060'
								}
							}
						}, { // Gentle breeze
							from: 3.3,
							to: 5.5,
							color: 'rgba(68, 170, 213, 0.1)',
							label: {
								text: 'Gentle breeze',
								style: {
									color: '#606060'
								}
							}
						}, { // Moderate breeze
							from: 5.5,
							to: 8,
							color: 'rgba(0, 0, 0, 0)',
							label: {
								text: 'Moderate breeze',
								style: {
									color: '#606060'
								}
							}
						}, { // Fresh breeze
							from: 8,
							to: 11,
							color: 'rgba(68, 170, 213, 0.1)',
							label: {
								text: 'Fresh breeze',
								style: {
									color: '#606060'
								}
							}
						}, { // Strong breeze
							from: 11,
							to: 14,
							color: 'rgba(0, 0, 0, 0)',
							label: {
								text: 'Strong breeze',
								style: {
									color: '#606060'
								}
							}
						}, { // High wind
							from: 14,
							to: 15,
							color: 'rgba(68, 170, 213, 0.1)',
							label: {
								text: 'High wind',
								style: {
									color: '#606060'
								}
							}
						}]
					},
					tooltip: {
						valueSuffix: ' m/s',
						shared: true
					},
					series: [{
						name: 'Wind Speed',
						data: $scope.wind_speed

					}, {
						name: 'Wind Gust',
						data: $scope.wind_gust
					}],
					navigation: {
						menuItemStyle: {
							fontSize: '10px'
						}
					}
				};
				$('#chart-latest-wind').highcharts(options_latest_wind);
			}
		};
	});

})();