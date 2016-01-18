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
.constant('queueTxt', {
	//Descripcion de las controles individuales
	titulo: 'ADMINISTRADOR DE COLAS',
	//******Descripcion de los atributos
	attribute: 'Atributo general',
	classManager: 'Clase:',
	queueLocation: 'IP-Puerto:',
	sleepTime: 'T. Espera:',
	refreshTime: 'T. Refrescar:',
	//******Descripcion de los Tag
	adminQueueId: 'Identificador:',
	workerThreadsCount: 'N° hilos soportados:',
	messageType: 'TIPO DE MENSAJERIA',
	messageTypeId: 'Id. mensaje:',
	messageTypeDesc: 'Descripcion:',
	supportedMessageFormats: 'FORMATOS SOPORTADOS',
	//Tabla de formatos
	messageFormatIdTbl: 'Identificador',
	opcionActionTbl: 'Accion',
	//Descripcion de los titulo de la tabla de colas
	adminQueueIdTbl: 'Identificador',
	workerThreadsCountTbl: 'N° hilos',
	messageTypeTbl: 'Formato'
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
	//Botonde de mantenimiento generañ
	grabar: 'GRABAR',
	agregar: 'AGREGAR',
	quitar: 'QUITAR',
	cancelar: 'CANCELAR',
	nuevo: 'NUEVO',
	mas: '+',
	menos: '-',

	//Indice de menu general
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
	//Atributos generales para todos los tag
	classRoutersManager: 'com.novatronic.sixadc.manager.RoutersManager',
	classDriversManager: 'com.novatronic.sixadc.manager.DriversManager',
	classBalancersManager: 'com.novatronic.sixadc.manager.BalancersManager',
	classChannelManager: 'com.novatronic.sixadc.manager.ChannelManager',
	ipPuerto: 'localhost:1099',
	//Ruta de los servicio expuesto, genenal
	urlMessageFormat: 'http://localhost:8080/ResDAS/MessageFormat',
	urlAdminQueue: 'http://localhost:8080/ResDAS/AdminQueue'
});