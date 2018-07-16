
(function(){
	angular.module('app')

	.service('cepService', ['$http', '$window', function($http, $window){

		var buscar = function(rua){
			
			return $http.get('https://viacep.com.br/ws/RJ/Rio%20de%20Janeiro/' + rua + '/json/');
			
		}

		return {
			buscar: buscar
		}

	}]);
})();