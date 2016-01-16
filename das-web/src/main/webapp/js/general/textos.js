angular.module('app.textos', [])
.constant('loginTextos', {
	titulo: 'CONTROL DE ACCESO',
	usuario: 'Usuario : ',
	contrasenia: 'Contrase\u00f1a :',
	ingresarUsuario: 'Ingrese el usuario',
	ingresarContrasenia: 'Ingrese la contrase\u00f1a',
	olvido: '\u00bfOlvid\u00f3 su contrase\u00f1a?',
	ingresar: 'INGRESAR'
})
.constant('messageFormatTexto', {
	titulo: 'FORMATEADOR DE TRAMA',
	messageFormatId: 'Identificador : ',
	messageFormatDesc: 'Descripcion :',
	transformerConfigFile: 'Archivo transformador : ',
	routerConfigFile: 'Archivo roteador : ',
	transformerStruct: 'Tipo estructura : '
})
.constant('tablaTexto', {
	messageFormatId: 'Identificador',
	messageFormatDesc: 'Descripcion',
	transformerConfigFile: 'Archivo transformador',
	routerConfigFile: 'Archivo roteador',
	transformerStruct: 'Tipo estructura',
	opcionAction: 'Accion'
})
.constant('adminQueueTexto', {
	titulo: 'ADMINISTRADOR DE COLAS',
	adminQueueId: 'Identificador : ',
	workerThreadsCount: 'Cantidad de hilos soportados :',
	messageType: 'TIPO DE MENSAJERIA',
	identificadorMensaje: 'Identificador de mensaje : ',
	descripcionMensaje: 'Descripcion de mensaje : ',
	supportedMessageFormats: 'TIPO DE FORMATOS SOPORTADOS'
})
.constant('driverTexto', {
	titulo: 'CONFIGURADOR DE DRIVERS',
	driverId: 'Identificador del driver: ',
	adminQueueId: 'Administrador de cola : ',
	type: 'Modo de operacion : ',
	timeOutConnect: 'Tiempo maximo de conexion : ',
	timeOutRead: 'Tiempo maximo de lectura : ',
	retries: 'Cantidad de reintentos : ',
	timeOutQueueRead: 'Tiempo de lectura de cola : ',

	name: 'Nombre del driver : ',
	port: 'puerto : ',
	maxConcurrentConnections: 'Maximo de conexiones concurrentes : ',
	forwardProcess: 'Procesos de destino : ',
	validaIp: 'Validacion de IP : ',
	concurrentUserSupport: 'Permiso de conexiones concurrentes : ',
	filters: 'FILTROS : ',
	inFilters: 'Filtros de entradas : ',
	outFilters: 'Filtros de salidas : '
})
.constant('botonTexto', {
	grabar: 'GRABAR',
	agregar: 'AGREGAR',
	quitar: 'QUITAR',
	cancelar: 'CANCELAR',
	nuevo: 'NUEVO',
	mas: '+',
	menos: '-',

	formateador: 'Formateador',
	cola: 'Cola',
	driver: 'Driver',
	balanceador: 'Balanceador',
	router: 'Router',
	servicio: 'Servicio',
	nodo: 'Nodo',
	perfil: 'Perfil'
})
.constant('queryRuta', {
	urlMessageFormat: 'http://localhost:8080/ResDAS/MessageFormat'
});