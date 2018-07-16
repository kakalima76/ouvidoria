angular.module('app')
.controller('confirmarController', ['$window', '$location', 'loginService', function($window, $location, loginService){
	var vm = this;
	vm.showError = true;
	vm.email = null;
	vm.pass = null;
	

	vm.logar = function(){
		var user = {}

		user['email'] = vm.email;
		user['password'] = vm.pass;

		var promise = loginService.logar(user);

		promise.then(function(data){
			if(data.status === 200){
				$window.localStorage['token'] = data.data.token;
				$location.path('/inserir');
				return;
			}
			
		})

		promise.catch(function(err){
			vm.showError = true;
			vm.message = err.data.message;
		})
	}

	vm.solicitarCadastro = function(){
		$location.path('/solicitar');
		console.log('solicitar');
	}

}])

//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5pZXJhbGRvQGdtYWlsLmNvbSIsImV4cCI6MTUyNDMzNjcwMCwiaWF0IjoxNTI0MjUwMzAwfQ.L4NZfZS4eykzGMBRbiIAY56gdpilZ59U9GHGlHuych8"