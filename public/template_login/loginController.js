angular.module('app')
.controller('loginController', ['$window', '$location', 'loginService', 'vcRecaptchaService', function($window, $location, loginService, vcRecaptchaService){
	var vm = this;
	vm.usuario = {};
	vm.showError = true;
	vm.usuario.email = null;
	vm.usuario.pass = null;
	vm.mostrarLogar = false;
	

	vm.submit = function() {
		/*vm.usuario.myRecaptchaResponse = 'x';*/
		if(vm.usuario.myRecaptchaResponse){
			var user = {}

			user['email'] = vm.usuario.email;
			user['password'] = vm.usuario.pass;

			var promise = loginService.logar(user);

				promise.then(function(data){
					if(data.status === 200){
						$window.localStorage['token'] = data.data.token;
						$location.path('/fiscalizar');
						//var response = vcRecaptchaService.getResponse('vm.myRecaptchaResponse'); // returns the string response
						return;
					}
					
				})

				promise.catch(function(err){
					vm.showError = true;
					vm.message = err.data.message;
				})
		}
    }

	vm.logar = function(){
		

	}

	vm.solicitarCadastro = function(){
		$location.path('/solicitar');
	}

	vm.solicitarTroca = function(){
		$location.path('/trocar');
	}

}])