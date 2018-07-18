
(function(){
	angular.module('app')

	.service('ouvidoriaService', ['$http', '$window', function($http, $window){

		var listar = function(cpf){
			
			return $http.get('http://localhost:3010/ouvidoria/listar');
			
		}

		var buscar = function(numero){
			
			return $http.post('http://localhost:3010/ouvidoria/buscar', numero);
			
		}

		var buscarBairro = function(local){
			
			return $http.post('http://localhost:3010/ouvidoria/buscarBairro', local);
			
		}

		var inserir = function(ouvidoria){
			
			return $http.post('http://localhost:3010/ouvidoria', ouvidoria);
			
		}


		return {
			listar: listar,
			buscar: buscar,
			inserir: inserir,
			buscarBairro: buscarBairro
		}

	}]);
})();