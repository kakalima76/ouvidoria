angular.module('app')
.service('authService', ['$q', '$window', function($q, $window){
	function isEmpty(val){
    	return (val === undefined || val == null || val.length <= 0) ? true : false;
	}

	var autentica = function(token){

		var deferred = $q.defer();

		var decod = JSON.parse($window.atob(token.split('.')[1]));

		var expiry = new Date();

		if(decod.exp < parseInt(expiry.getTime() / 1000)){
			deferred.reject('Token expirado');

			return;
		}

		deferred.resolve('Token válido');


		return deferred.promise;
	}


	return {
		autentica: autentica
	}




}]);