DROP DATABASE IF EXISTS `analytics`;
CREATE DATABASE `analytics`;

USE `analytics`;

CREATE TABLE `users` (
  `id` INT (11) NOT NULL AUTO_INCREMENT,
  `fname` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `phone` VARCHAR(50) NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

CREATE TABLE `questions` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `question` VARCHAR(300) NULL,
  `jumpTo` INT(11) DEFAULT -1,
  `render` VARCHAR(100) NOT NULL,
  `start` VARCHAR(100) NULL,
  `end` VARCHAR(100) NULL,
  `position` INT(11) NOT NULL DEFAULT 0,
  `step` INT(11) NOT NULL DEFAULT 1,
  `multiplicator` DECIMAL(4,2) NOT NULL DEFAULT 0,
  `smultiplicator` DECIMAL(4,2) NOT NULL DEFAULT 0,
  `dimension` INT(11) NOT NULL DEFAULT 0,
  `sdimension` INT(11) NOT NULL DEFAULT 0,
  PRIMARY KEY(`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

CREATE TABLE `options` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `position` VARCHAR(100) NOT NULL,
  `label` VARCHAR(200) NOT NULL,
  `score` DECIMAL NOT NULL,
  `hasText` TINYINT(1) NOT NULL DEFAULT 0,
  `isJump` TINYINT(1) NOT NULL DEFAULT 0,
  `idQuestion` INT(11),
  PRIMARY KEY(`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

CREATE TABLE `dimensions` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `multiplicator` DECIMAL(4,2) NOT NULL DEFAULT 0,
  `rookie` INT(11) NOT NULL DEFAULT 21,
  `initial` INT(11) NOT NULL DEFAULT 42,
  `advanced` INT(11) NOT NULL DEFAULT 63,
  `expert` INT(11) NOT NULL DEFAULT 84,
  PRIMARY KEY(`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

CREATE TABLE `results` (
  `dimension` INT(11) NOT NULL,
  `score` INT(11) NOT NULL DEFAULT 0,
  `idUser` INT(11) NOT NULL,
  PRIMARY KEY(`idUser`, `dimension`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `answers` (
  `idUser` INT(11) NOT NULL,
  `question` VARCHAR(100) NOT NULL,
  `answer` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`idUser`, `question`, `answer`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `maturity` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `type` VARCHAR(100) NULL,
  `general` TEXT NULL,
  `dimension1` TEXT NULL,
  `dimensionC` TEXT NULL,
  `dimension4` TEXT NULL,
  `dimension5` TEXT NULL,
  `dimension6` TEXT NULL,
  `dimension7` TEXT NULL,
  `result` TEXT NULL,
  PRIMARY KEY(`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

INSERT INTO `maturity`(`type`, `general`, `dimension1`, `dimensionC`, `dimension4`, `dimension5`, `dimension6`, `dimension7`, `result`) VALUES
('ROOKIE', 'El resultado del cuestionario ubica en un nivel ???novato??? de madurez digital. La empresa no ha incorporado herramientas digitales o lo ha realizado en forma m??nima, con muy bajo impacto en los procesos y actividades.', 'En t??rminos generales la Direcci??n de la empresa no cuenta con un nivel de inter??s y/o conocimiento suficiente en las nuevas tecnolog??as para iniciar y avanzar en su transformaci??n digital.', 'El nivel de uso de equipamiento digital e inform??tico es m??nimo e insuficiente para iniciar un proceso de transformaci??n digital.', 'La empresa no facilita o facilita muy pocas posibilidades de pago digitales para sus clientes. El uso de software contable es inexistente o se remite solamente a la obligatoriedad de la facturaci??n electr??nica.', 'En este nivel la empresa no ha comenzado su proceso de transformaci??n digital en el proceso productivo, por lo tanto no cuenta con software espec??fico en esta ??rea o no lo utiliza.', 'La empresa no utiliza un CRM. Si bien tu empresa ha realizado alg??n intento por poner en marcha alguna herramienta de marketing digital, el esfuerzo es por ahora insuficiente para considerarse como un inicio sistem??tico en esta ??rea. La comunicaci??n de la empresa y el contacto con los clientes sigue siendo por medios tradicionales sin aprovechar las herramientas digitales.', 'La empresa no utiliza software para la gesti??n de los recursos humanos. Muestra poca disposici??n, capacidad y habilidades de su personal hacia las tecnolog??as digitales. No ha tomado medidas de capacitaci??n suficientes para iniciar un proceso de transformaci??n digital.', 'La empresa tiene que fomentar el inter??s por las tecnolog??as digitales, comenzando por su Direcci??n e involucrando a cada uno de sus miembros para que participen en el conocimiento de las mejores soluciones a aplicar. 
Se puede obtener buena informaci??n en organismos del gobierno y no gubernamentales sobre el proceso de la transformaci??n digital. B??squedas ordenadas en Internet sobre tecnolog??as aplicadas en este tipo de empresas, puede ser un buen comienzo para saber por d??nde comenzar. Buscar en sitios especializados, comparar las propuestas que les parezcan m??s interesantes, hacer consultas a los proveedores, les brindaran informaci??n espec??fica para un comienzo ordenado. 
Tambi??n es importante hablar con colegas, del mismo sector y de otros. Esto te permitir?? conocer sus experiencias, cu??les han sido las mejores soluciones que encontraron y el esfuerzo que les requiri?? implementarlas. 
Estimula a los miembros de tu equipo a utilizar las herramientas digitales que ya tienen a mano y a pensar en c??mo podr??an facilitar a??n mas las tareas que realizan. 
Como primer objetivo para comenzar tu camino de transformaci??n digital puede ser identificar las tecnolog??as ???clave??? a aplicar en tu negocio, esas que son fundamentales para mantener y lograr mejores niveles de productividad y competitividad. 
El mercado y los consumidores utilizan cada vez m??s las herramientas digitales, por lo cual la adaptaci??n de tu empresa es hoy una necesidad. Para esto involucrar y capacitar a todo el equipo de colaboradores de la empresa es fundamental, constituy??ndose en estas circunstancias en una inversi??n impostergable. Si no se cuenta con recursos econ??micos, buscar capacitaciones gratuitas en Internet puede ser un buen camino para comenzar, invirtiendo solamente tiempo y utilizando dispositivos tecnol??gicos con los que la empresa ya cuenta (pc??s, tel??fonos digitales, etc).
Este debe ser el inicio de una gesti??n ininterrumpida de esta ??rea, que lleve a la empresa a un trabajo continuo de transformaci??n digital que la coloque en los niveles de competitividad que exige el sector.'),
('INITIAL', 'El resultado del cuestionario ubica en un nivel ???inicial??? de madurez digital. 
La empresa ha incorporado herramientas tecnol??gicas que mejoran el desempe??o en algunos procedimientos y actividades espec??ficas. Se han realizado inversiones de tiempo y organizaci??n para incorporar soluciones gen??ricas y de muy bajo costo o gratuitas.', 'La Direcci??n de la empresa muestra inter??s y ha acumulado un conocimiento inicial sobre soluciones tecnol??gicas a implementar. Todav??a esto no se ha constituido en un plan que pueda prever un esfuerzo sostenido, no se tienen previsiones claras sobre inversi??n de recursos (tiempo, dinero) para lograr un impacto significativo en la organizaci??n.', 'La empresa ha incorporado algunas herramientas aisladas y generales que indican un comienzo en la transformaci??n digital, pero todav??a insuficiente.', 'La empresa brinda a sus clientes diferentes opciones de pago digitales, pero no abarca todas las posibilidades. 
Utiliza software contable en forma parcial.', 'La empresa cuenta con software de control de stock o planificaci??n de la producci??n, pero lo utiliza parcialmente.', 'La empresa ha desarrollado algunas herramientas en Internet, con resultados aislados y parciales. Esto no configura una estrategia acertada todav??a, ya que no se integra un sistema de herramientas que trabajen en conjunto para lograr los objetivos de ventas. Puede tener  acceso a un software CRM pero no lo utiliza o lo utiliza parcialmente.', 'Las personas que integran la empresa muestran cierto inter??s en las tecnolog??as digitales a aplicar. Se ha tomado alguna medida en cuanto a la utilizaci??n de software espec??fico de gesti??n del capital humano, o en cuanto a la capacitaci??n del personal en temas digitales.', 'La empresa ya cuenta con un nivel de conocimiento que le permite valorar positivamente el impacto que tendr?? la implementaci??n de soluciones tecnol??gicas en su desempe??o. 
Es necesario que se comience a planificar y ordenar el proceso de implementaci??n de soluciones por lo menos en uno de los procesos o ??reas de gesti??n. Para esto es importante elegir bien por d??nde se va a comenzar, y para esto se pueden utilizar distintos criterios, seg??n sea la situaci??n de la empresa. Podr?? ser el proceso m??s cr??tico para el desempe??o general de la empresa, o aquel que cuenta con mayores debilidades y es urgente mejorarlo. Tambi??n podr?? ocurrir que tenemos alg??n recurso que no estamos utilizando, y que nos permita involucrar al equipo en la mejora de una actividad, con bajo costo utilizando ya que se utiliza algo ya existente. La elecci??n del criterio debe ser fruto de un an??lisis que tenga como objetivo iniciar inmediatamente y/o continuar ininterrumpidamente nuestro proceso de transformaci??n digital.
Es hora de que la informaci??n acumulada y los esfuerzos aislados que haz realizado, se conviertan en un esfuerzo continuo de transformaci??n digital de la empresa, de forma de lograr y sostener los niveles de competitividad que exige el sector actualmente.'),
('ADVANCED', 'El resultado del cuestionario ubica en un nivel ???avanzado??? de madurez digital. 
La empresa avanz?? en su proceso de transformaci??n digital con inversi??n econ??mica, de tiempo y organizaci??n, aplicando soluciones tecnol??gicas espec??ficas y gen??ricas que funcionan en paralelo, incidiendo en la mejora significativa de uno o varios procesos y ??reas de gesti??n.', 'La Direcci??n de la empresa ha marcado un rumbo cierto y planificado para la transformaci??n digital de la empresa, logrando resultados significativos en algunas de las ??reas.   Existen previsiones para seguir avanzando en forma planificada en la transformaci??n digital. Debe mantener el rumbo y el esfuerzo para lograr un nivel de digitalizaci??n integrado.', 'La empresa ha incorporado infraestructura tecnologica que le permite tener impactos significativos en la eficiencia de por lo menos uno de los procesos, como fruto del trabajo planificado y la dotaci??n de los recursos necesarios.', 'La empresa brinda a sus clientes todas o la mayor??a de las posibilidades de pago digitales. 
Utiliza software contable en forma parcial.', 'La empresa cuenta con software de control de stock y planificaci??n de la producci??n, pero lo utiliza parcialmente.', 'La empresa ha desarrollado un conjunto de herramientas que permiten lograr resultados significativos en varias ??reas del marketing digital, logrando objetivos concretos. Todav??a no se logra una gesti??n integral de las herramientas de forma sostenida. Usa parcialmente un software CRM.', 'La empresa, en general muestra inter??s del personal, y el mismo se ha capacitado para la incorporaci??n y uso de tecnolog??as digitales y se involucra activamente en la b??squeda de soluciones. Ha logrado adem??s la utilizaci??n eficiente de alguna herramienta aplicada a la gesti??n o a la mejora del trabajo colaborativo del personal.', 'La empresa ya muestra resultados significativos en cuanto a la mejora de la eficiencia lograda con la implementaci??n de herramientas tecnol??gicas en por lo menos un proceso o ??rea de gesti??n. 
Es importante que aproveches esta experiencia, replic??ndola en los dem??s procesos o ??reas, visualizando tu empresa como un sistema ??nico. Para esto te puedes apoyar en tu mapa de procesos y/o en tu organigrama funcional, si a??n no lo tienes realizado es recomendable que lo hagas ya que va a ser un insumo importante para continuar el proceso de transformaci??n digital de tu empresa. 
Pensar tu empresa como un sistema ??nico te permitir?? redise??ar tu plan de digitalizaci??n en forma integral, considerando soluciones para todas las ??reas y ordenando la implementaci??n en base a un cronograma que considere plazos y presupuesto. Adem??s, podr??s considerar soluciones integradas que dar??n mayor eficiencia a toda la empresa, optimizando los esfuerzos tanto de organizaci??n como econ??micos. Hoy las empresas peque??as pueden acceder a soluciones integradas muy potentes, que eran imposibles hace unos a??os por sus altos costos econ??micos. 
Conviene revisar si todo el equipo ha estado involucrado en las implementaciones digitales ya realizadas, si no, si queda personal que todav??a no ha participado, es importante en esta etapa que busques la forma de involucrarlos, ya sea con alguna transformaci??n parcial o con alguna instancia de capacitaci??n.'),
('EXPERT', 'El resultado del cuestionario ubica en un nivel ???experto??? de madurez digital. 
La empresa muestra un nivel de transformaci??n digital que impacta de forma significativa en el desempe??o de la organizaci??n como un sistema ??nico. Se han realizado de forma estrat??gica y planificada inversiones de tiempo, organizaci??n y dinero para incorporar herramientas que funcionan en forma integrada, aportando a la eficiencia general y de cada uno de los procesos de la empresa.', 'La Direcci??n de la empresa viene sosteniendo un proceso firme de transformaci??n digital que ha tenido efectos directos en la gesti??n integral de la empresa y en la eficiencia de sus procesos, realizando esfuerzos de notorios de inversi??n de recursos de organizaci??n y econ??micos. Muestra resoluci??n firme de mantener y mejorar continuamente su nivel de digitalizaci??n como herramienta fundamental para la eficiencia de su sistema de gesti??n.', 'La empresa cuenta con la infraestructura tecnol??gica suficiente para un desempe??o eficiente de todos los procesos en forma integrada en un sistema de gesti??n, aprovechando todos los beneficios de la digitalizaci??n. Esta base le permitir?? sostener un proceso de mejora continua manteniendo sus niveles de digitalizaci??n.', 'La empresa brinda a sus clientes todas las posibilidades de pago. 
Utiliza un software contable completamente.', 'La empresa cuenta con software de control de stock y planificaci??n de la producci??n, utiliza ambos m??dulos completamente.', 'La empresa ha configurado un sistema de gesti??n de marketing y ventas que integra soluciones de CRM con una utilizaci??n eficiente de las herramientas de Internet.', 'El capital humano de la empresa est?? capacitado y trabaja naturalmente con las herramientas digitales aplicadas a todas las ??reas de la empresa. Cuenta con instancias de capacitaci??n que permiten la actualizaci??n permanente. El personal utiliza herramientas colaborativas que permiten mejorar la eficiencia de las comunicaciones y el trabajo en equipo. Las habilidades digitales son consideradas un factor clave a la hora de contratar nuevo personal.', 'Tu empresa ha alcanzado un nivel de eficiencia mediante la implementaci??n de soluciones digitales integradas que la colocan en un buen nivel de competitividad en el sector que act??a. 
Sin embargo, es importante no descansarse y estar atentos a cualquier oportunidad de mejora que pueda quedar a??n por hacer, y obviamente vigilar los cambios que el mundo tecnol??gico nos propone continuamente.  
La recomendaci??n fundamental en este nivel es mantener el sistema de mejora continua bien aceitado, que permita a la empresa estar al d??a en cuanto al cambio tecnol??gico, de forma de mantener los niveles de eficiencia que le permite a la empresa ser competitiva en el sector en el que act??a. Para esto mantener los niveles de involucramiento del personal es fundamental, que todos est??n informados y tengan los canales abiertos para realizar mejoras al sistema que ya tienen implementado.')
;

INSERT INTO `dimensions`(`name`, `multiplicator`) VALUES
('Direcci??n estrat??gica, liderazgo, cultura.', 2.00),
('Nivel de equipamiento (hardware)', 4.20),
('Nivel de software', 2.55),
('Administraci??n, contabilidad, finanzas', 9.33),
('Proceso productivo - Operaciones', 14.00),
('Marketing y ventas', 1.00),
('Capital humano', 3.00)
;

INSERT INTO `questions`(`question`, `jumpTo`, `render`, `start`, `end`, `position`, `step`, `multiplicator`, `dimension`) VALUES
('??Cu??nto inter??s tiene por las tecnolog??as digitales?', -1, 'valoration', 'No me interesan', 'Son muy interesantes', 10, 2, 1.50, 1),
('??Conoce los beneficios que pueden ofrecer las tecnolog??as digitales a su empresa?', -1, 'valoration', 'No los conoce en absoluto', 'Los conoce perfectamente', 11, 2, 1.50, 1),
('En su empresa ??Usan celulares?', -1, 'multiple', NULL, NULL, 12, 2, 4.00, 2),
('En su empresa ??Usan tablets,  computadoras port??tiles o de escritorio?', -1, 'multiple', NULL, NULL, 13, 2, 4.00, 2),
('En su empresa ??Usan Internet?', -1, 'multiple', NULL, NULL, 14, 2, 4.00, 2),
('En su empresa ??usan m??quinas con controles digitales que automaticen procesos productivos?', -1, 'multiple', NULL, NULL, 15, 2, 4.00, 2)
;

INSERT INTO `questions`(`question`, `jumpTo`, `render`, `start`, `end`, `position`, `step`, `multiplicator`, `dimension`, `smultiplicator`, `sdimension`) VALUES
('Sus clientes ??C??mo pagan sus productos o servicios?', -1, 'multiple', NULL, NULL, 16, 2, 1.50, 3, 1.50, 4)
;

INSERT INTO `questions`(`question`, `jumpTo`, `render`, `start`, `end`, `position`, `step`, `multiplicator`, `dimension`) VALUES
('??Su empresa cuenta con equipamiento suficiente para realizar su trabajo de forma digital?', -1, 'valoration', 'No son suficientes', 'Son suficientes', 17, 2, 1.00, 2),
('??Utiliza alg??n programa o aplicaci??n para facilitar las tareas en su empresa?', 20, 'multiple', NULL, NULL, 18, 3, 3.00, 3),
('??Qu?? tipo de programas o aplicaciones usan en su empresa?', -1, 'multiple', NULL, NULL, 19, 3, 1.50, 3),
('??Cu??les son los nombres de los programas o aplicaciones que utiliza la empresa?', -1, 'text', NULL, NULL, 20, 3, 0, 0),
('Los programas y aplicaciones que utiliza son:', -1, 'multiple', NULL, NULL, 21, 3, 1.00, 3)
;

INSERT INTO `questions`(`question`, `jumpTo`, `render`, `start`, `end`, `position`, `step`, `multiplicator`, `dimension`, `smultiplicator`, `sdimension`) VALUES
('??Entre los programas o aplicaciones que utiliza, cuenta con un m??dulo para contabilidad? ??En qu?? medida lo utiliza?', -1, 'multiple', NULL, NULL, 22, 3, 1.00, 3, 1.00, 4),
('??Entre los programas o aplicaciones que utiliza, cuenta con Facturaci??n Electr??nica? ??En qu?? medida lo utiliza?', -1, 'multiple', NULL, NULL, 23, 3, 1.00, 3, 1.00, 4),
('??Entre los programas o aplicaciones que utiliza, cuenta con un m??dulo de gesti??n de stock? ??En qu?? medida lo utiliza?', -1, 'multiple', NULL, NULL, 24, 3, 1.00, 3, 1.00, 5),
('??Entre los programas o aplicaciones que utiliza, cuenta con un m??dulo de gesti??n de los recursos humanos? ??En qu?? medida lo utiliza?', -1, 'multiple', NULL, NULL, 25, 3, 1.33, 3, 1.00, 7),
('??Entre los programas o aplicaciones que utiliza, cuenta con un m??dulo CRM para gesti??n de clientes y ventas? ??En qu?? medida lo utiliza?', -1, 'multiple', NULL, NULL, 26, 3, 2.33, 3, 1.00, 6),
('??Entre los programas y aplicaciones que utiliza, cuenta con un m??dulo de planificaci??n de la producci??n? ??En qu?? medida lo utiliza?', -1, 'multiple', NULL, NULL, 27, 3, 1.00, 3, 1.00, 5),
('??Entre los programas o aplicaciones que utiliza, cuenta con funcionalidades de trabajo colaborativo, gesti??n de tareas, proyectos, comunicaci??n a distancia, chat? ??En qu?? medida lo utiliza?', -1, 'multiple', NULL, NULL, 28, 3, 1.33, 3, 1.00, 7)
;

INSERT INTO `questions`(`question`, `jumpTo`, `render`, `start`, `end`, `position`, `step`, `multiplicator`, `dimension`) VALUES
('??Su empresa cuenta con sitio web?', 25, 'multiple', NULL, NULL, 29, 4, 7.00, 6),
('??El sitio web? ??Quien lo administra?', -1, 'multiple', NULL, NULL, 30, 4, 3.50, 6),
('??Cada cuanto tiempo la empresa actualiza su sitio web?', -1, 'multiple', NULL, NULL, 31, 4, 1.17, 6),
('El sitio web ??cuenta con funcionalidades de e commerce (carrito de compra)?', 25, 'multiple', NULL, NULL, 32, 4, 7.00, 6),
('??La empresa vende a trav??s de su sitio web?', -1, 'multiple', NULL, NULL, 33, 4, 7.00, 6),
('??La empresa vende por otras plataformas de Internet (ej: Mercado Libre)', -1, 'multiple', NULL, NULL, 34, 5, 7.00, 6),
('??Qu?? redes sociales utiliza su empresa?', 29, 'check', NULL, NULL, 35, 5, 1.00, 6),
('Las redes sociales ??Qui??n las administra?', -1, 'multiple', NULL, NULL, 36, 5, 3.50, 6),
('??Cada cuanto tiempo la empresa publica o promociona contenido en las redes sociales?', -1, 'multiple', NULL, NULL, 37, 5, 1.17, 6),
('La empresa ??realiza alg??n otro tipo de publicidad o publicaciones en otros medios de Internet (google ads, portales, medios de prensa, etc)', -1, 'multiple', NULL, NULL, 38, 5, 7.00, 6),
('??Qu?? porcentaje de las ventas totales de la empresa se realizan por la web? Considerando todas las herramientas que utiliza (sitio web propio, market places o plataformas tipo mercado libre, redes sociales, portales, etc.)', -1, 'multiple', NULL, NULL, 39, 5, 1.40, 6),
('??Considera que el nivel de dititalizaci??n de su empresa es suficiente para mantenerla productiva y competitiva?', -1, 'valoration', 'Insuficiente', 'Suficiente', 40, 6, 1.50, 1),
('??Su empresa tiene planificado o previsto incorporar nuevas tecnolog??as digitales dentro de los pr??ximos 12 meses?', 34, 'multiple', NULL, NULL, 41, 6, 3.00, 1),
('??En qu?? ??reas de la empresa se producir??n mejoras por la incorporaci??n de las nuevas tecnolog??as digitales previstas?', 35, 'check', NULL, NULL, 42, 6, 1.00, 1),
('??Tiene alguna noci??n acerca de las tecnolog??as digitales que podr??a implementar en su empresa?', -1, 'valoration', 'No tenemos noci??n', 'Conocemos claramente que tecnolog??as digitales debemos implementar', 43, 6, 1.50, 1),
('??Su empresa cuenta con recursos econ??micos (capital propio o financiamiento) para invertir en nuevas tecnolog??as digitales?', -1, 'multiple', NULL, NULL, 44, 6, 3.00, 1),
('En su empresa ??utilizan la informaci??n que le brindan las herramientas digitales que tienen instaladas para conocer los distintos aspectos de su negocio como insumo para tomar decisiones?', -1, 'valoration', 'No las utilizan', 'Utilizan reportes o informes de todas las herramientas', 45, 6, 1.50, 1),
('??Con qu?? facilidad se desenvuelven en su empresa en el uso de las tecnolog??as digitales?',  -1, 'valoration', 'Las usamos a un nivel b??sico, a veces con dificultades.', 'Las usamos con mucha facilidad.', 46, 7, 1.00, 7),
('Incluy??ndose y considerando a sus empleados / colaboradores, ??que nivel de disposici??n existe para afrontar los cambios y el aprendizaje necesario para mejorar el nivel de digitalizaci??n de la empresa?', -1, 'valoration', 'Ninguna disposici??n', 'Disposici??n total', 47, 7, 1.00, 7),
('En su empresa, ??se han educado o capacitado en temas digitales?', -1, 'valoration', 'No lo hemos hecho. Cada uno intenta resolver como puede.', ' Hemos tenido instancias formales de capacitaci??n promovidas por la empresa.', 48, 7, 1.00, 7),
('??En su empresa  se realiza trabajo remoto o "teletrabajo"?', -1, 'multiple', NULL, NULL, 49, 7, 2.00, 7),
('Al momento de contratar personal para su empresa ??se consideran las habilidades digitales como un factor clave?', -1, 'multiple', NULL, NULL, 50, 7, 2.00, 7),
('Raz??n social de la empresa', -1, 'text', NULL, NULL, 1, 1, 0, 0),
('Nombre fantas??a de la empresa', -1, 'text', NULL, NULL, 2, 1, 0, 0),
('Antig??edad de la empresa en a??os', -1, 'text', NULL, NULL, 3, 1, 0, 0),
('??Cu??l es el sector en el que opera su empresa?', -1, 'multiple', NULL, NULL, 4, 1, 0, 0),
('??Cu??l es el rubro de su empresa?', -1, 'text', NULL, NULL, 5, 1, 0, 0),
('Incluy??ndose, ??cuantas personas trabajan en su empresa?', -1, 'multiple', NULL, NULL, 6, 1, 0, 0),
('La facturaci??n anual de su empresa es de:', -1, 'multiple', NULL, NULL, 7, 1, 0, 0),
('??D??nde se encuentra su empresa?', -1, 'multiple', NULL, NULL, 8, 1, 0, 0),
('??Su empresa tiene sucursales?', -1, 'multiple', NULL, NULL, 9, 1, 0, 0)
;

INSERT INTO `options`(`idQuestion`, `position`, `label`, `hasText`, `isJump`, `score`) VALUES
(3, 1, 'Si', 0, 0, 1),
(3, 2, 'No', 0, 0, 0),
(4, 1, 'Si', 0, 0, 1),
(4, 2, 'No', 0, 0, 0),
(5, 1, 'Si', 0, 0, 1),
(5, 2, 'No', 0, 0, 0),
(6, 1, 'Si', 0, 0, 1),
(6, 2, 'No', 0, 0, 0),
(7, 1, 'Pagan con efectivo o cheque', 0, 0, 0),
(7, 2, 'Pagan con efectivo, cheque y/o tarjetas (cr??dito o d??bito)', 0, 0, 1),
(7, 3, 'Pagan con efectivo, cheque, tarjetas (cr??dito o d??bito) y/o pago por Internet o transferencias bancarias.', 0, 0, 2),
(9, 1, 'Si', 0, 0, 1),
(9, 2, 'No', 0, 1, 0),
(10, 1, 'Programas o aplicaciones de oficina (como Word y Excel). ', 0, 0, 1),
(10, 2, 'Programas o aplicaciones de oficina y varios programas o aplicaciones especializados en varias ??reas de la empresa.', 0, 0, 2),
(12, 1, 'Residentes en las computadoras de la empresa', 0, 0, 1),
(12, 2, 'Algunos residentes y otros en la nube', 0, 0, 2),
(12, 3, 'En la "nube"', 0, 0, 3),
(12, 4, 'No sabe', 0, 0, 0),
(13, 1, 'No tiene', 0, 0, 0),
(13, 2, 'Tiene pero no lo utiliza', 0, 0, 1),
(13, 3, 'Tiene y lo utiliza parcialmente', 0, 0, 2),
(13, 4, 'Tiene y lo utiliza completamente', 0, 0, 3),
(14, 1, 'No tiene', 0, 0, 0),
(14, 2, 'Tiene pero no lo utiliza', 0, 0 , 1),
(14, 3, 'Tiene y lo utiliza parcialmente', 0, 0, 2),
(14, 4, 'Tiene y lo utiliza completamente', 0, 0, 3),
(15, 1, 'No tiene', 0, 0, 0),
(15, 2, 'Tiene pero no lo utiliza', 0, 0 , 1),
(15, 3, 'Tiene y lo utiliza parcialmente', 0, 0, 2),
(15, 4, 'Tiene y lo utiliza completamente', 0, 0, 3),
(16, 1, 'No tiene', 0, 0, 0),
(16, 2, 'Tiene pero no lo utiliza', 0, 0 , 1),
(16, 3, 'Tiene y lo utiliza parcialmente', 0, 0, 2),
(16, 4, 'Tiene y lo utiliza completamente', 0, 0, 3),
(17, 1, 'No tiene', 0, 0, 0),
(17, 2, 'Tiene pero no lo utiliza', 0, 0 , 1),
(17, 3, 'Tiene y lo utiliza parcialmente', 0, 0, 2),
(17, 4, 'Tiene y lo utiliza completamente', 0, 0, 3),
(18, 1, 'No tiene', 0, 0, 0),
(18, 2, 'Tiene pero no lo utiliza', 0, 0 , 1),
(18, 3, 'Tiene y lo utiliza parcialmente', 0, 0, 2),
(18, 4, 'Tiene y lo utiliza completamente', 0, 0, 3),
(19, 1, 'No tiene', 0, 0, 0),
(19, 2, 'Tiene pero no lo utiliza', 0, 0 , 1),
(19, 3, 'Tiene y lo utiliza parcialmente', 0, 0, 2),
(19, 4, 'Tiene y lo utiliza completamente', 0, 0, 3),
(20, 1, 'Si', 0, 0, 1),
(20, 2, 'No', 0, 1, 0),
(21, 1, 'Lo administra la propia empresa', 0, 0, 2),
(21, 2, 'Lo administra una persona o empresa ajena a la empresa', 0, 0 , 1),
(21, 3, 'No se administra', 0, 0, 0),
(22, 1, 'Diariamente', 0, 0, 6),
(22, 2, 'Semanalmente', 0, 0 , 5),
(22, 3, 'Mensualmente', 0, 0, 4),
(22, 4, 'Trimestralmente', 0, 0, 3),
(22, 5, 'Semestralmente', 0, 0, 2),
(22, 6, 'Anualmente', 0, 0, 1),
(22, 7, 'No lo actualiza', 0, 0, 0),
(23, 1, 'Si', 0, 0, 1),
(23, 2, 'No', 0, 1, 0),
(24, 1, 'Si', 0, 0, 1),
(24, 2, 'No', 0, 0, 0),
(25, 1, 'Si', 0, 0, 1),
(25, 2, 'No', 0, 0, 0),
(26, 1, 'No utiliza', 0, 1, 0),
(26, 2, 'Facebook', 0, 0, 1),
(26, 3, 'Whatsapp', 0, 0, 1),
(26, 4, 'Instagram', 0, 0, 1),
(26, 5, 'Twitter', 0, 0, 1),
(26, 6, 'Linkedin', 0, 0, 1),
(26, 7, 'Youtube', 0, 0, 1),
(26, 8, 'Otra', 1, 0, 1),
(27, 1, 'Las administra la propia empresa', 0, 0, 2),
(27, 2, 'Las administra una persona o empresa ajena a la empresa', 0, 0, 1),
(27, 3, 'No se administran', 0, 0, 0),
(28, 1, 'Diariamente', 0, 0, 6),
(28, 2, 'Semanalmente', 0, 0 , 5),
(28, 3, 'Mensualmente', 0, 0, 4),
(28, 4, 'Trimestralmente', 0, 0, 3),
(28, 5, 'Semestralmente', 0, 0, 2),
(28, 6, 'Anualmente', 0, 0, 1),
(28, 7, 'No lo actualiza', 0, 0, 0),
(29, 1, 'Si', 0, 0, 1),
(29, 2, 'No', 0, 0, 0),
(30, 1, 'No vende por Internet', 0, 0 , 0),
(30, 2, 'entre 1% y 20%', 0, 0, 1),
(30, 3, 'entre 20% y 40%', 0, 0, 2),
(30, 4, 'entre 40% y 60%', 0, 0, 3),
(30, 5, 'entre 60% y 80%', 0, 0, 4),
(30, 6, 'entre 80% y 100%', 0, 0, 5),
(30, 7, 'No sabe', 0, 0, 0),
(32, 1, 'No esta previsto', 0, 1, 0),
(32, 2, 'Est?? previsto pero sin presupuesto asignado todav??a', 0, 0, 1),
(32, 3, 'Est?? planificado y con presupuesto asignado', 0, 0, 2),
(33, 1, 'Administraci??n, contabilidad. ', 0, 1, 0),
(33, 2, 'Marketing y ventas.', 0, 0, 1),
(33, 3, 'Proceso productivo.', 0, 0, 1),
(33, 4, 'Log??stica.', 0, 0, 1),
(33, 5, 'Recursos humanos.', 0, 0, 1),
(33, 6, 'Otra', 1, 0, 1),
(35, 1, 'No tiene recursos econ??micos', 0, 0, 0),
(35, 2, 'Cuenta con recursos econ??micos parciales.', 0, 0, 1),
(35, 3, 'Cuenta con recursos econ??micos suficientes.', 0, 0, 2),
(40, 1, 'No se realiza.', 0, 0, 0),
(40, 2, 'Se realiza aleatoriamente, no en forma planificada.', 0, 0, 1),
(40, 3, 'Se utiliza en forma planificada para mejorar la eficiencia del trabajo.', 0, 0, 2),
(41, 1, 'No se consideran', 0, 0, 0),
(41, 2, 'Se consideran, pero no son excluyentes.', 0, 0, 1),
(41, 3, 'Se consideran como excluyentes.', 0, 0, 2),
(45, 1, 'Industrias manufactureras.', 0, 0, 0),
(45, 2, 'Servicios', 0, 0, 0),
(45, 3, 'Comercio', 0, 0, 0),
(45, 4, 'Otro:', 1, 0, 0),
(47, 1, 'S??lo yo.', 0, 0, 0),
(47, 2, 'entre 1 y 4 personas.', 0, 0, 0),
(47, 3, 'entre 5 y 19 personas.', 0, 0, 0),
(47, 4, 'entre 20 y 99 personas.', 0, 0, 0),
(47, 5, 'M??s de 99', 0, 0, 0),
(48, 1, 'Hasta $ 2.000.000.-', 0, 0, 0),
(48, 2, 'De $ 2.000.000 a $ 10.000.000', 0, 0, 0),
(48, 3, 'De $ 10.000.000 a $ 45.000.000', 0, 0, 0),
(48, 4, 'De $ 45.000.000 a 150.000.000', 0, 0, 0),
(48, 5, 'M??s de $ 150.000.000', 0, 0, 0),
(48, 6, 'No cuenta con la informaci??n', 0, 0, 0),
(49, 1, 'Montevideo', 0, 0, 0),
(49, 2, 'Interior (especifique departamente y ciudad)', 1, 0, 0),
(50, 1, 'S?? ??Cu??ntas?', 1, 0, 0),
(50, 2, 'No', 0, 0, 0)
;