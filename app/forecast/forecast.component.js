angular.
  module('forecast', []).
  component('forecast', {
    templateUrl: 'app/forecast/forecast.template.html',
    controller: ['$http', '$location', '$timeout', '$q', '$log',
      function ForecastController($http, $location, $timeout, $q, $log) {
        var autocomplete;
        this.unit = "imperial";
        this.fiveDaysWeather = [];
        this.currentCity = { // default location is set to Toronto.
          lat: 43.653226,
          lng: -79.38318429999998,
          name: "Toronto, ON, Canada"
        }
        var self = this;

        this.$onInit = function () {
          autocomplete = new google.maps.places.Autocomplete(
            /** @type {HTMLInputElement} */(document.getElementById('autocomplete')),
            { types: ['geocode'] });

          google.maps.event.addListener(autocomplete, 'place_changed', function (data, a, b) {
            self.currentCity = {
              lat: this.getPlace().geometry.location.lat(),
              lng: this.getPlace().geometry.location.lng(),
              name: this.getPlace().formatted_address
            };
            self.changeWeather();
          });
          self.changeWeather();
        };

        this.onUnitChanged = function() {
          this.changeWeather();
        }

        this.changeWeather = function () {
          $http.get('http://api.openweathermap.org/data/2.5/forecast/daily?lat=' + self.currentCity.lat
            + '&lon=' + self.currentCity.lng + '&cnt=5&apikey=8caa3a62ba1f3b52d931888f38d1bc75&units='
            + self.unit)
            .then(
            function (resp, status, headers) {
              self.fiveDaysWeather = resp.data.list;
            },
            function (resp, status, header, config) {
              console.log(resp);
            }
            );
        }

        this.formatDate = function(dt){
          var dte = new Date(dt * 1000)
          return getDay(dte.getDay()) + " " + dte.getDate() + " " + getMonth(dte.getMonth());
        }

        getDay = function(day){
          var dayData = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
          return dayData[day];
        }
        getMonth = function(mon){
          var monthData = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
          return monthData[mon];
        }
      }]
  });