
(function(){
	angular.module('app')

	.service('cpfService', ['$http', '$window', function($http, $window){

		var buscar = function(cpf){
			
			return $http.get('https://api.cpfcnpj.com.br/7bba67bec15302f5be2cb0830e0f8c31/2/json/' + cpf);
			
		}


		return {
			buscar: buscar
		}

	}]);
})();