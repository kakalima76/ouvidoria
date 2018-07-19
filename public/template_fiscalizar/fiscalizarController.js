angular.module('app')
.controller('fiscalizarController', ['$filter','tiposService', '$window', 'loginService', 'cepService', 'bairrosService', 'fiscalizadoService', 'ouvidoriaService', function($filter, tiposService, $window, loginService, cepService, bairrosService, fiscalizadoService, ouvidoriaService){
	var vm = this;
	vm.mostrarTagMulta = false
	vm.ouvidoria = {};
	vm.acao = {};
	vm.showError = false;
	vm.mostrarLoading = false;
	vm.user = loginService.usuario().name;
	vm.matricula = loginService.usuario().matricula;
	/*vm.filtroTipo = incisosService.tipo();*/
	vm.bairros = bairrosService.getBairros();
	vm.tipos = tiposService.get();
	vm.acoesEfetiva = tiposService.getAcoesEfetiva();
	vm.acoesNEfetiva = tiposService.getAcoesNEfetiva();
	vm.acoesVistoriaMedidasIniciais = tiposService.getAcoesVistoriaMedidasIniciais();
	vm.orgaos = tiposService.getOrgaos();
	vm.mostrarEnviar = false;


	//escondo todos os campos de resposta aqui
	var esconde = function(){
		vm.mostrar01 = false;
		vm.mostrar02 = false;
		vm.mostrar03 = false;
		vm.mostrar04 = false;
		vm.mostrar05 = false;
		vm.mostrar06 = false;
		vm.mostrar07 = false;
		vm.mostrar08 = false;
		vm.mostrar09 = false;
		vm.mostrar10 = false;
		vm.mostrar11 = false;
		vm.mostrar12 = false;
		vm.mostrar13 = false;
		vm.mostrar14 = false;
		vm.mostrar15 = false;

		return;
	};

	esconde();


	var acrescentaZero = function(indice){
				if(indice < 10){
					return '0' + indice;
				}

				return indice;
	};
	
	
	
	function compare(a,b) {
		  	if(a.data > b.data){
		  		return 1;
		  	}else if (a.data < b.data){
		  		return -1;
		  	}else{
		  		return 0;
		    }
	};	
	
	
	vm.arrayExibe = [];

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

			pegaData();
	};

	var pegaData = (data => {

		if(!isEmpty(document.getElementById("data").value)){
			data = document.getElementById("data").value

				var obj = {}

				obj.dia = data.substring(0,2);
				obj.mes = data.substring(3,5);
				obj.ano = data.substring(6,10);
				obj.hora = data.substring(11,13);
				obj.minutos = data.substring(14);

			
				var d = new Date();
				d.setDate(obj.dia);
				d.setMonth(obj.mes - 1);
				d.setFullYear(obj.ano);
				d.setHours(parseInt(obj.hora) - 3);
				d.setMinutes(parseInt(obj.minutos));

				var resposta = d.getTime() 	

				vm.ouvidoria.date = resposta;
		}
	})


	vm.pegaCep = (logradouro => {

		var promise = cepService.buscar(logradouro.replace(/\s/gi, '%20'));

		promise

		.then(data => {

			vm.ouvidoria.cep =  data.data[0].cep;

		})
	})


	//mostra apenas a div que contém as informações necessárias para
	//compor o objeto de resposta
	vm.escolheAcao = function(value){

			arrayTipos = tiposService.get();
			var tipo = arrayTipos.indexOf(value);
			esconde(); //esconde todas as tags de resposta
			switch(tipo)
			{
    			case 0:
        		vm.mostrar01 = true;
        		break;
        		case 1:
        		vm.mostrar02 = true;
        		break;
        		case 2:
        		vm.mostrar03 = true;
        		break;
        		case 3:
        		vm.mostrar04 = true;
        		break;
        		case 4:
        		vm.mostrar05 = true;
        		break;
        		case 5:
        		vm.mostrar06 = true;
        		break;
        		case 6:
        		vm.mostrar07 = true;
        		break;
        		case 7:
        		vm.mostrar08 = true;
        		break;
        		case 8:
        		vm.mostrar09 = true;
        		break;
        		case 9:
        		vm.mostrar10 = true;
        		break;
        		case 10:
        		vm.mostrar11 = true;
        		break;
        		case 11:
        		vm.mostrar12 = true;
        		break;
        		case 12:
        		vm.mostrar13 = true;
        		break;
        		case 13:
        		vm.mostrar14 = true;
        		break;
        		case 14:
        		vm.mostrar15 = true;
        		break;
			}
	};

	vm.gerarResp01 = function(){
		vm.ouvidoria.data = document.getElementById("data").value
		var data = vm.ouvidoria.data;
		var dia = data.substring(0,10);
		var hora = data.substring(10);
		vm.mostrarEnviar = true;

		//15/07/2018 11:32

		vm.resp01 = "A equipe vistoriou o local em " + dia + 
		", às " + hora + " horas, onde constatou " + 
		$filter('lowercase')(vm.ouvidoria.constatadoEfetiva) + ". A ação adotada foi " + vm.ouvidoria.acaoAdotadaEfetiva + 
		". Caso a irregularidade retorne, favor registrar novo chamado 1746. A Coordenadoria de Controle Urbano agradece a confiança!";
	
		vm.ouvidoria.resposta = vm.resp01;
	}

	vm.gerarResp02 = function(){
		vm.ouvidoria.data = document.getElementById("data").value
		var data = vm.ouvidoria.data;
		var dia = data.substring(0,10);
		var hora = data.substring(10);
		vm.mostrarEnviar = true;

		vm.resp02 = "A equipe vistoriou o local em " + dia + " às " + hora + 
		" horas, onde constatou " + $filter('lowercase')(vm.ouvidoria.constatadoNEfetiva) + 
		". A ação adotada foi " + vm.ouvidoria.acaoAdotadaNEfetiva + 
		". Caso a irregularidade persista, favor registrar uma reclamação por meio da Central 1746. A Coordenadoria de Controle Urbano agradece a confiança!"
	
		vm.ouvidoria.resposta = vm.resp02;
	}

	vm.gerarResp03 = function(){
		vm.ouvidoria.data = document.getElementById("data").value
		var data = vm.ouvidoria.data;
		var dia = data.substring(0,10);
		var hora = data.substring(10);
		vm.mostrarEnviar = true;

		vm.resp03 = "A equipe vistoriou o local em " + dia + ", às " + hora + 
		" horas, onde constatou " + $filter('lowercase')(vm.ouvidoria.constatadoProcessoComMedidas) + 
		". A ação adotada foi " + vm.ouvidoria.acaoAdotadaProcessoComMedidas + 
		". Para realizar operação de ordenamento urbano foi aberto o processo administrativo " + 
		vm.ouvidoria.processoComMedidas.toString() + " e será necessário apoio de outros órgãos públicos. Acompanhe o andamento do processo pelo site http://www2.rio.rj.gov.br/sicop/ . A Coordenadoria de Controle Urbano agradece a sua solicitação!"
	
		vm.ouvidoria.resposta = vm.resp03;
	}

	vm.gerarResp04 = function(){
		vm.ouvidoria.data = document.getElementById("data").value
		var data = vm.ouvidoria.data;
		var dia = data.substring(0,10);
		var hora = data.substring(10);
		vm.mostrarEnviar = true;

		vm.resp04 = "A equipe vistoriou o local em " + dia + " às " + hora + 
		" horas, onde constatou " + $filter('lowercase')(vm.ouvidoria.constatadoProcessoSemMedidas) + 
		". Para realizar operação de ordenamento urbano foi aberto o processo administrativo " +
		vm.ouvidoria.processoSemMedidas.toString() + " e será necessário apoio de outros órgãos públicos. Acompanhe o andamento do processo pelo site http://www2.rio.rj.gov.br/sicop/ . A Coordenadoria de Controle Urbano agradece a sua solicitação!"
	
		vm.ouvidoria.resposta = vm.resp04;
	}

	vm.gerarResp05 = function(){
		vm.ouvidoria.data = document.getElementById("data").value
		var data = vm.ouvidoria.data;
		var dia = data.substring(0,10);
		var hora = data.substring(10);
		vm.mostrarEnviar = true;

		vm.resp05 = "Informamos que a sua solicitação foi incluída no processo administrativo " + 
		+ vm.ouvidoria.processoRisco.toString() + " com objetivo de planejar operação de ordenamento urbano, o que dependerá do forte apoio dos órgãos de segurança. Acompanhe o andamento do processo pelo site http://www2.rio.rj.gov.br/sicop/ . A Coordenadoria de Controle Urbano agradece a sua solicitação!"
	
		vm.ouvidoria.resposta = vm.resp05;
	}

	vm.gerarResp06 = function(){
		vm.mostrarEnviar = true;

		vm.resp06 = "Informamos que a sua solicitação foi incluída no processo administrativo " + 
		+ vm.ouvidoria.processoOperacao.toString() + " e será realizada operação de ordenamento urbano com apoio de outros órgãos públicos. Acompanhe o andamento do processo pelo site http://www2.rio.rj.gov.br/sicop/ . A Coordenadoria de Controle Urbano agradece a sua solicitação!"
	
		vm.ouvidoria.resposta = vm.resp06;
	}

	vm.gerarResp07 = function(){

		vm.resp07 = "Informamos que a sua solicitação foi incluída no processo administrativo " 
		+ vm.ouvidoria.processoPolis + " com objetivo de legalizar e organizar as atividades no local. Acompanhe o andamento do processo pelo site http://www2.rio.rj.gov.br/sicop/ . A Coordenadoria de Controle Urbano agradece a sua solicitação!"
	
		vm.ouvidoria.resposta = vm.resp07;
	}

	vm.gerarResp08 = function(){
		vm.ouvidoria.data = document.getElementById("data").value
		var data = vm.ouvidoria.data;
		var dia = data.substring(0,10);
		var hora = data.substring(10);
		vm.mostrarEnviar = true;

		vm.resp08 = "A equipe realizou operação de ordenamento urbano no local em " + dia + " às " + hora +
		" horas, e " + $filter('lowercase')(vm.ouvidoria.detalhesOperacao) +  
		". Caso a irregularidade retorne, favor registrar novo chamado 1746. A Coordenadoria de Controle Urbano agradece a confiança!"
	
		vm.ouvidoria.resposta = vm.resp08;
	}

	vm.gerarResp09 = function(){
		vm.ouvidoria.data = document.getElementById("data").value
		var data = vm.ouvidoria.data;
		var dia = data.substring(0,10);
		var hora = data.substring(10);
		vm.mostrarEnviar = true;

		vm.resp09 = "Em " + dia + " às " + hora +
		" horas, foi observado " + $filter('lowercase')(vm.ouvidoria.obsAtipica) + "."   	
	
		vm.ouvidoria.resposta = vm.resp09;
	}

	vm.gerarResp10 = function(){
		vm.ouvidoria.data = document.getElementById("data").value
		var data = vm.ouvidoria.data;
		var dia = data.substring(0,10);
		var hora = data.substring(10);
		vm.mostrarEnviar = true;

		vm.resp10 = "A equipe realizou operação de ordenamento urbano no local em " + dia + " às " + hora +
		" horas, e não foram constatadas evidências de irregularidades. Caso a irregularidade retorne, favor registrar novo chamado 1746. A Coordenadoria de Controle Urbano agradece a confiança!"   		
	
		vm.ouvidoria.resposta = vm.resp10;
	}

	vm.gerarResp11 = function(){
		vm.ouvidoria.data = document.getElementById("data").value
		var data = vm.ouvidoria.data;
		var dia = data.substring(0,10);
		var hora = data.substring(10);
		vm.mostrarEnviar = true;

		vm.resp11 = "A equipe realizou operação de ordenamento urbano no local em " + dia + " às " + hora +
		" horas, onde constatou " +  $filter('lowercase')(vm.ouvidoria.constatadoNenhumaInfracao)  + ". No momento da fiscalização, não ocorriam irregularidades. Caso ocorram, favor registrar novo chamado 1746. A Coordenadoria de Controle Urbano agradece a confiança!"   	
	
		vm.ouvidoria.resposta = vm.resp11;
	}

	vm.gerarResp12 = function(){
		vm.ouvidoria.data = document.getElementById("data").value
		var data = vm.ouvidoria.data;
		var dia = data.substring(0,10);
		var hora = data.substring(10);
		vm.mostrarEnviar = true;

		vm.resp12 = "A equipe realizou operação de ordenamento urbano no local em " + dia + " às " + hora +
		" horas, e não foi possível atendê-lo porque " +  $filter('lowercase')(vm.ouvidoria.inconsistenciaAnalise) + 
		". Favor registrar novo chamado 1746 contendo " +  $filter('lowercase')(vm.ouvidoria.detalheAnalise) + ". A Coordenadoria de Controle Urbano agradece a sua solicitação!"   	
	
		vm.ouvidoria.resposta = vm.resp12;
	}

	vm.gerarResp13 = function(){
		vm.ouvidoria.data = document.getElementById("data").value
		var data = vm.ouvidoria.data;
		var dia = data.substring(0,10);
		var hora = data.substring(10);
		vm.mostrarEnviar = true;

		vm.resp13 = "A equipe vistoriou o local em " + dia + " às " + hora +
		" horas, e não foi possível atendê-lo porque " +  $filter('lowercase')(vm.ouvidoria.inconsistenciaVistoria) + 
		". Favor registrar novo chamado 1746 contendo " +  $filter('lowercase')(vm.ouvidoria.detalheVistoria) + ". A Coordenadoria de Controle Urbano agradece a sua solicitação!"   	
	
		vm.ouvidoria.resposta = vm.resp13;
	}

	vm.gerarResp14 = function(){
		vm.ouvidoria.data = document.getElementById("data").value
		var data = vm.ouvidoria.data;
		var dia = data.substring(0,10);
		var hora = data.substring(10);
		vm.mostrarEnviar = true;

		vm.resp14 = "A equipe analisou sua solicitação em " + dia + " às " + hora +
		" horas, e não foi possível atendê-lo porque se trata de " +  $filter('lowercase')(vm.ouvidoria.analiseDeCompetencia) + 
		" A Coordenadoria de Controle Urbano fiscaliza atividades econômicas exercidas em áreas públicas. " +
		"Por isso, sua solicitação será transferida a " + vm.ouvidoria.orgaoCompetenteAnalise + "."   	
	
		vm.ouvidoria.resposta = vm.resp14;
	}

	vm.gerarResp15 = function(){
		vm.ouvidoria.data = document.getElementById("data").value
		var data = vm.ouvidoria.data;
		var dia = data.substring(0,10);
		var hora = data.substring(10);
		vm.mostrarEnviar = true;

		vm.resp15 = "A equipe vistoriou o local em " + dia + " às " + hora +
		" horas, e não foi possível atendê-lo porque se trata de " +  $filter('lowercase')(vm.ouvidoria.vistoriaDeCompetencia) + 
		" A Coordenadoria de Controle Urbano fiscaliza atividades econômicas exercidas em áreas públicas. " +
		"Por isso, sua solicitação será transferida a " + vm.ouvidoria.orgaoCompetenteVistoria + "."   		
	
		vm.ouvidoria.resposta = vm.resp15;
	}

	function isEmpty(val){
    	return (val === undefined || val == null || val.length <= 0) ? true : false;
	}

	vm.enviar = function(value){
		/*vm.ouvidoria.data = document.getElementById("data").value*/
		
		if
			(
				isEmpty(vm.ouvidoria.especie) || isEmpty(vm.ouvidoria.data) || isEmpty(vm.ouvidoria.bairro) || isEmpty(vm.ouvidoria.logradouro) || isEmpty(vm.ouvidoria.numero) || isEmpty(vm.ouvidoria.tipo) || isEmpty(vm.ouvidoria.complemento)
			)
		{
			$window.alert("Preencha os campos superiores!")
		}else
		{

			
			var obj = 
				{

					'matricula': vm.matricula,
					'nome': vm.user,
					'numero': vm.ouvidoria.numero,
					'tipo': vm.ouvidoria.tipo,
					'especie': vm.ouvidoria.especie,
					'bairro': vm.ouvidoria.bairro.bairro,
					'logradouro': vm.ouvidoria.logradouro.logradouro,
					'complemento': vm.ouvidoria.complemento,
					'cep': vm.ouvidoria.cep || '',
					'resposta': vm.ouvidoria.resposta || '',
					'data': vm.ouvidoria.date
				}

			var promise = ouvidoriaService.inserir(obj);

			promise

			.then(function(lista){

				vm.ouvidoria = {}

				console.log(lista.status);
			})
		}

		
	}

	

	vm.logoff = function(){
		$window.localStorage.removeItem('token');
	};


	
}]);
