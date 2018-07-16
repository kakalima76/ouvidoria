angular.module('app')
.factory('timestampInterceptor', [function(){
	return {
		request: function(config){
			var url = config.url;
			if(url.indexOf('listar') > -1){return config;}
			if(url.indexOf('remover') > -1){return config;}
			var timestamp = new Date().getTime();
			config.url = url + "?timestamp=" + timestamp;
			return config;
		}
	}
}])