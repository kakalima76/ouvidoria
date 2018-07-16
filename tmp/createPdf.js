var pdf = require('pdfkit');
var fs = require('fs');
var myDoc = new pdf;

var imprime = function(){
	myDoc.pipe(fs.createWriteStream('node.pdf'));

	myDoc.font('Times-Roman')
		.fontSize(20)
		.text('Teste de nova impressão',1,1);

	myDoc.font('Times-Roman')
		.fontSize(20)
		.text('Teste de nova impressão',1,18);


	myDoc.end();
}

module.exports = {
	'imprime': imprime
}
