
(function(){
	angular.module('app')

	.service('loginService', ['$http', '$window', function($http, $window){

		var logar = function(obj){
			return $http.post('https://credenciais.herokuapp.com/login', obj);
		}

		var registrar = function(obj){
			return $http.post('https://credenciais.herokuapp.com/requestRegister', obj);
		}

		var trocar = function(obj){
			return $http.post('https://credenciais.herokuapp.com/requestNewPassword', obj);
		}

		var usuario = function(){
			var user = JSON.parse($window.atob($window.localStorage['token'].split('.')[1]));
			return user;
		}

		return {
			logar: logar,
			registrar: registrar,
			trocar: trocar,
			usuario: usuario
		}

	}]);
})();