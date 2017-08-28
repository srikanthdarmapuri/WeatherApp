describe('forecast', function() {
    
      beforeEach(module('forecast'));
    
      describe('forecastController', function() {
        var $httpBackend, ctrl;
        var response = {"city":{"id":6167863,"name":"Downtown Toronto","coord":{"lon":-79.3829,"lat":43.6501},"country":"CA","population":0},"cod":"200","message":0.2300528,"cnt":5,"list":[{"dt":1503853200,"temp":{"day":61.84,"min":61.84,"max":62.69,"night":62.69,"eve":61.84,"morn":61.84},"pressure":1018.37,"humidity":75,"weather":[{"id":802,"main":"Clouds","description":"scattered clouds","icon":"03n"}],"speed":12.15,"deg":97,"clouds":44},{"dt":1503939600,"temp":{"day":69.33,"min":64.87,"max":70.57,"night":65.12,"eve":67.93,"morn":64.87},"pressure":1018.79,"humidity":72,"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"speed":6.91,"deg":151,"clouds":88},{"dt":1504026000,"temp":{"day":68.56,"min":61.16,"max":68.56,"night":61.16,"eve":64.44,"morn":63.97},"pressure":1016.41,"humidity":73,"weather":[{"id":802,"main":"Clouds","description":"scattered clouds","icon":"03d"}],"speed":11.43,"deg":105,"clouds":44},{"dt":1504112400,"temp":{"day":72.16,"min":60.37,"max":72.16,"night":62.17,"eve":68.79,"morn":60.37},"pressure":1007.54,"humidity":0,"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"speed":2.44,"deg":286,"clouds":1,"rain":0.35},{"dt":1504198800,"temp":{"day":64.26,"min":55.6,"max":64.26,"night":55.6,"eve":63.1,"morn":62.4},"pressure":1008.3,"humidity":0,"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"speed":9.04,"deg":49,"clouds":82,"rain":1.86}]};
        beforeEach(inject(function($componentController, _$httpBackend_) {
          $httpBackend = _$httpBackend_;
          $httpBackend.expectGET('http://api.openweathermap.org/data/2.5/forecast/daily?lat=43.653226&lon=-79.38318429999998&cnt=5&apikey=8caa3a62ba1f3b52d931888f38d1bc75&units=imperial')
                      .respond(response);
    
          ctrl = $componentController('forecast');
        }));
    
        it('should fetch 5 days weather forecast', function() {
          jasmine.addCustomEqualityTester(angular.equals);
    
          expect(ctrl.fiveDaysWeather).toEqual([]);
          ctrl.changeWeather();  
          $httpBackend.flush();
          expect(ctrl.fiveDaysWeather).toEqual(response.list);
        });
    
      });
    
    });