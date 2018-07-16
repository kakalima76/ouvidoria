angular.module('app')
.controller('solicitarController', ['$location', 'loginService', function($location, loginService){
	var vm = this;
	vm.showError = false;
	

	vm.solicitar = function(value){
		var obj = {};
		obj['email'] = value;
		var promise = loginService.registrar(obj);
		promise
		.then(function(data){
			$location.path('/confirmar');
		})
		.catch(function(err){
			vm.showError = true;
			vm.message = err.data.message;
		})	
	}
	
}]);

