
(function(){
	angular.module('app')

	.service('fiscalizadoService', ['$http', '$window', function($http, $window){

		var listar = function(){
			
			return $http.get('https://credenciais.herokuapp.com/fiscalizado/listar');
			
		}

		var buscar = function(cpf){

			return $http.post('https://credenciais.herokuapp.com/fiscalizado/buscar', {'cpf': cpf});
			
		}

		var salvarFiscalizado = function(obj){ //receberá o objeto vm.autuado

			return $http.post('https://credenciais.herokuapp.com/fiscalizado', obj);
			
		}

		var salvar = function(obj){ //receberá o objeto vm.autuado

			return $http.post('https://credenciais.herokuapp.com/fiscalizado/fiscalizacao', obj);
			
		}

		var remover = function(obj){ //receberá o objeto vm.autuado

			return $http.post('https://credenciais.herokuapp.com/fiscalizado/fiscalizacao/remove', obj);
			
		}


		return {
			listar: listar,
			buscar: buscar,
			salvar: salvar,
			salvarFiscalizado: salvarFiscalizado,
			remover: remover
		}

	}]);
})();