angular.module('app')
.controller('trocarController', ['$location', 'loginService', function($location, loginService){
	var vm = this;
	vm.showError = false;
	

	vm.solicitar = function(value){
		var obj = {};
		obj['email'] = value;
		var promise = loginService.trocar(obj)
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

