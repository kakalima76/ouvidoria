
(function(){
	angular.module('app')

	.service('ouvidoriaService', ['$http', '$window', function($http, $window){

		var listar = function(cpf){
			
			return $http.get('https://credenciais.herokuapp.com/ouvidoria/listar');
			
		}

		var buscar = function(numero){
			
			return $http.post('https://credenciais.herokuapp.com/ouvidoria/buscar', numero);
			
		}

		var buscarBairro = function(local){
			
			return $http.post('https://credenciais.herokuapp.com/ouvidoria/buscarBairro', local);
			
		}

		var inserir = function(ouvidoria){
			
			return $http.post('https://credenciais.herokuapp.com/ouvidoria', ouvidoria);
			
		}


		return {
			listar: listar,
			buscar: buscar,
			inserir: inserir,
			buscarBairro: buscarBairro
		}

	}]);
})();