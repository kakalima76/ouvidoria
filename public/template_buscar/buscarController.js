angular.module('app')
.controller('buscarController', ['$window', 'ouvidoriaService', 'loginService', function($window, ouvidoriaService, loginService){
	var vm = this;
	vm.resposta = {}
	vm.mostrar = false;
	vm.user = loginService.usuario().name;
	vm.matricula = loginService.usuario().matricula;

	function isEmpty(val){
    	return (val === undefined || val == null || val.length <= 0) ? true : false;
	}


	vm.buscar = function(value){

		vm.mostrar = false;

		if(!isEmpty(value)){
			var promise = ouvidoriaService.buscar({numero: value});

			promise

				.then(data => {

					vm.mostrar = true;

					vm.resposta =  data.data[0];

				})

		}else{
			$window.alert("Informe um número para a consulta!")
		}

		
	}
	
	
}]);
