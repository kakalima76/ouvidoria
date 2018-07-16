angular.module('app', ['ngRoute', 'ui.bootstrap', 'vcRecaptcha'])

.config(['$routeProvider', '$locationProvider', '$httpProvider', function($routeProvider, $locationProvider, $httpProvider) {
	$routeProvider
	.when('/', {
		templateUrl: 'template_login/login.html',
		controller: 'loginController',
		controllerAs: 'vm'
	})

	.when('/fiscalizar', {
		templateUrl: 'template_fiscalizar/fiscalizar.html',
		controller: 'fiscalizarController',
		controllerAs: 'vm'/*,
		resolve:{
			auth: ['authService', '$window', function(authService, $window){
				var promise = authService.autentica($window.localStorage['token']);
				return promise;
			}]
		}*/
	})

	.when('/buscar', {
		templateUrl: 'template_buscar/buscar.html',
		controller: 'buscarController',
		controllerAs: 'vm'/*,
		resolve:{
			auth: ['authService', '$window', function(authService, $window){
				var promise = authService.autentica($window.localStorage['token']);
				return promise;
			}]
		}*/
	})

	.when('/listar', {
		templateUrl: 'template_listar/listar.html',
		controller: 'listarController',
		controllerAs: 'vm'/*,
		resolve:{
			auth: ['authService', '$window', function(authService, $window){
				var promise = authService.autentica($window.localStorage['token']);
				return promise;
			}]
		}*/
	})

	.when('/solicitar', {
		templateUrl: 'template_solicitar/solicitar.html',
		controller: 'solicitarController',
		controllerAs: 'vm'
	})

	.when('/confirmar', {
		templateUrl: 'template_confirmar/confirmar.html',
		controller: 'confirmarController',
		controllerAs: 'vm'
	})

	.when('/trocar', {
		templateUrl: 'template_trocar/trocar.html',
		controller: 'trocarController',
		controllerAs: 'vm'
	})

		.otherwise({redirectTo: '/'});

	$locationProvider.html5Mode({
  		enabled: false,
  		requireBase: false
	});

	$httpProvider.interceptors.push('timestampInterceptor');


}])