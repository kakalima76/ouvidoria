angular.module('app')
.controller('buscarBairroController', ['$window', 'ouvidoriaService', 'bairrosService', 'loginService', function($window, ouvidoriaService, bairrosService, loginService){
	var vm = this;
	vm.resposta = {}
	vm.mostrar = false;
	vm.bairros = bairrosService.getBairros();
	vm.arrayLocais = [];
	vm.user = loginService.usuario().name;
	vm.matricula = loginService.usuario().matricula;

	function isEmpty(val){
    	return (val === undefined || val == null || val.length <= 0) ? true : false;
	}

	vm.pegaRuas = function(value){
			function compareRuas(a,b,c,d) {
		  	if(a.logradouro < b.logradouro){
		  		return -1;
		  	}else if (a.logradouro > b.logradouro){
		  		return 1;
		  	}else{
		  		return 0;
		    }	 
		}
			vm.mostrarLoading = true;
			var promise = bairrosService.get(value.bairro.replace(/\s/gi, '%20'));
			promise.then(function(dados){

			vm.ruas = dados.data.sort(compareRuas);
			vm.mostrarLoading = false;
			});
			promise.catch(function(){
			vm.mostrarLoading = false;
			});
	};



	vm.buscar = function(value){

		var obj = {
			'bairro': value.bairro.bairro,
			'logradouro': value.logradouro.logradouro
		}


		vm.mostrar = false;

		if(!isEmpty(value)){
			var promise = ouvidoriaService.buscarBairro(obj);

			promise

				.then(data => {

					vm.mostrar = true;

					vm.arrayLocais =  data.data;


				})

		}else{
			$window.alert("Informe um número para a consulta!")
		}

	
	};
	
	
}]);
