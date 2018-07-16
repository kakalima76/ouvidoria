angular.module('app')
.service('tiposService', [function(){
	var tipos =
  	[
        "ATUAÇÃO SOBRE IRREGULARIDADES COM MEDIDA EFETIVA",
        "ATUAÇÃO SOBRE IRREGULARIDADES SEM MEDIDA CONCLUSIVA",
        "PROCESSO ABERTO APÓS VISTORIA COM MEDIDAS INICIAIS",
        "PROCESSO ABERTO APÓS VISTORIA SEM MEDIDAS INICIAIS",
        "PROCESSO ABERTO ANTES DA VISTORIA POR RISCO A INTEGRIDADE",
        "PROCESSO ABERTO ANTES DA VISTORIA PARA OPERAÇÃO",
        "PROCESSO ABERTO ANTES DA VISTORIA PARA POLIS",
        "RESPOSTA COM OPERAÇÃO DE ORDENAMENTO URBANO",
        "DEMANDA ATÍPICA",
        "SEM POSSIBILIDADE ATENDIMENTO POR LOCAL VAZIO",
        "SEM POSSIBILIDADE ATENDIMENTO POR AUSÊNCIA DE INFRAÇÕES",
        "SEM POSSIBILIDADE ATENDIMENTO POR INFORMAÇÕES INCORRETAS COM ANÁLISE",
        "SEM POSSIBILIDADE ATENDIMENTO POR INFORMAÇÕES INCORRETAS COM VISTORIA",
        "TRANSFERÊNCIA DE CHAMADO INDEVIDO COM ANÁLISE",
        "TRANSFERÊNCIA DE CHAMADO INDEVIDO COM VISTORIA"
    ];	

    var acoesEfetiva = 
    [
        "a retirada imediata e emissão da Notificação de Desocupação",
        "o ajuste imediato e emissão da Notificação de Adequação",
        "a aplicação de multa",
        "a apreensão de mercadorias e equipamentos",
        "a apreensão de mercadorias",
        "a apreensão de equipamentos",
    ]

    var acoesNEfetiva = 
    [
        "a emissão da Notificação de Desocupação", 
        "a emissão da Notificação de Adequação",
        "a emissão e fixação na estrutura da Notificação a Desocupação"
    ]

    var acoesVistoriaMedidasIniciais = 
    [
        "a emissão da Notificação de Desocupação", 
        "a emissão da Notificação de Adequação",
        "a emissão e fixação na estrutura da Notificação a Desocupação"
    ]

    var orgaos = 
    [
        "Guarda Municipal do Rio de Janeiro - GM-Rio",
        "Companhia Municipal de Limpeza Urbana - COMLURB",
        "Coordenadoria de Licenciamento e Fiscalização - CLF",
        "Coordenação de Feiras - CFE",
        "Vigilância Sanitária - VISA",
        "Secretaria Municipal de Assistência Social e Direitos Humanos - SMASDH",
        "Secretaria Municipal de Conservação e Meio Ambiente - SECONSERMA",
        "Secretaria Municipal de Desenvolvimento, Emprego e Inovação - SMDEI",
        "Secretaria Municipal de Fazenda - SMF",
        "Secretaria Municipal de Ordem Pública - SEOP",
        "Secretaria Municipal de Transportes - SMTR",
        "Secretaria Municipal de Urbanismo, Infraestrutura e Habitação - SMUIH",
        "Companhia de Engenharia de Tráfego do RJ - CET-Rio",
        "Companhia Municipal de Energia e Iluminação - RIOLUZ"
    ]



 
    var get = function(){
       
         	return tipos;
    }

    var getAcoesEfetiva = function(){
       
            return acoesEfetiva;
    }

    var getAcoesNEfetiva = function(){
       
            return acoesNEfetiva;
    }

    var getAcoesVistoriaMedidasIniciais = function(){
       
            return acoesVistoriaMedidasIniciais;
    }

     var getOrgaos = function(){
       
            return orgaos;
    }

    

    return {
    	get: get,
        getAcoesEfetiva: getAcoesEfetiva,
        getAcoesNEfetiva: getAcoesNEfetiva,
        getAcoesVistoriaMedidasIniciais: getAcoesVistoriaMedidasIniciais,
        getOrgaos: getOrgaos        
    }

}]);
