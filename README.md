# `@nodecfdi/cfdi-core`

[![Source Code][badge-source]][source]
[![Npm Node Version Support][badge-node-version]][node-version]
[![Discord][badge-discord]][discord]
[![Latest Version][badge-release]][release]
[![Software License][badge-license]][license]
[![Build Status][badge-build]][build]
[![Reliability][badge-reliability]][reliability]
[![Maintainability][badge-maintainability]][maintainability]
[![Code Coverage][badge-coverage]][coverage]
[![Violations][badge-violations]][violations]
[![Total Downloads][badge-downloads]][downloads]

> Library of `@nodecfdi/cfdi-core` tools and utilities for work with CFDI´s

:us: The documentation of this project is in spanish as this is the natural language for intended audience.

:mexico: La documentación del proyecto está en español porque ese es el lenguaje principal de los usuarios.

## Acerca de `@nodecfdi/cfdi-core`

Librería que contiene las herramientas base para trabajar con CFDI's.

Librería inspirada por la versión para php https://github.com/eclipxe13/CfdiUtils modularizada.

## Inicio Rápido

### Instalación

```bash
# pnpm
pnpm add @nodecfdi/cfdi-core

# npm
npm install @nodecfdi/cfdi-core

# yarn
yarn add @nodecfdi/cfdi-core

# bun
bun add @nodecfdi/cfdi-core
```

### Uso principal (Node.js / ESM)

```ts
import {
  CfdiVersion,
  nodeFromXmlString,
  nodeToXmlString,
  XmlNode,
} from '@nodecfdi/cfdi-core';

// Crear un nodo XML y agregar hijos
const comprobante = new XmlNode('cfdi:Comprobante', {
  Version: '4.0',
  Serie: 'A',
  Folio: '100',
});
comprobante.addChild(
  new XmlNode('cfdi:Emisor', {
    Rfc: 'EKU9003173C9',
    Nombre: 'ESCUELA KEMPER URGATE',
    RegimenFiscal: '601',
  }),
);

// Exportar a XML
const xml = nodeToXmlString(comprobante, true);

// Importar desde XML y descubrir la versión de CFDI
const root = nodeFromXmlString(xml);
const version = new CfdiVersion().getFromNode(root);
console.log(version); // '4.0'
```

### Uso en navegador (IIFE)

```html
<script src="https://unpkg.com/@nodecfdi/cfdi-core/dist/index.iife.js"></script>
<script>
  const { XmlNode, nodeToXmlString, CfdiVersion } = window.ncCfdiCore;

  const node = new XmlNode('cfdi:Comprobante', { Version: '4.0' });
  console.log(new CfdiVersion().getFromNode(node)); // '4.0'
  console.log(nodeToXmlString(node));
</script>
```

## Documentación

La documentación está disponible en el sitio web [NodeCfdi](https://nodecfdi.com/packages/cfdi-core/getting-started/)

## Soporte

Puedes obtener soporte abriendo un ticket en Github.

## Compatibilidad

Esta librería se mantendrá compatible con al menos la versión con
[soporte activo de Node](https://nodejs.org/es/about/releases/) más reciente.

También utilizamos [Versionado Semántico 2.0.0](https://semver.org/lang/es/) por lo que puedes usar esta librería sin temor a romper tu aplicación.

## Contribuciones

Las contribuciones con bienvenidas. Por favor lee [CONTRIBUTING][] para más detalles y recuerda revisar el archivo [CHANGELOG][].

## Copyright and License

The `@nodecfdi/cfdi-core` library is copyright © [NodeCfdi](https://github.com/nodecfdi) and licensed for use under the MIT License (MIT). Please see [LICENSE][] for more information.

[contributing]: https://github.com/nodecfdi/.github/blob/main/docs/CONTRIBUTING.md
[changelog]: https://github.com/nodecfdi/cfdi-core/blob/main/CHANGELOG.md
[source]: https://github.com/nodecfdi/cfdi-core
[node-version]: https://www.npmjs.com/package/@nodecfdi/cfdi-core
[discord]: https://discord.gg/AsqX8fkW2k
[release]: https://www.npmjs.com/package/@nodecfdi/cfdi-core
[license]: https://github.com/nodecfdi/cfdi-core/blob/main/LICENSE
[build]: https://github.com/nodecfdi/cfdi-core/actions/workflows/build.yml?query=branch:main
[reliability]: https://sonarcloud.io/component_measures?id=nodecfdi_cfdi-core&metric=Reliability
[maintainability]: https://sonarcloud.io/component_measures?id=nodecfdi_cfdi-core&metric=Maintainability
[coverage]: https://sonarcloud.io/component_measures?id=nodecfdi_cfdi-core&metric=Coverage
[violations]: https://sonarcloud.io/project/issues?id=nodecfdi_cfdi-core&resolved=false
[downloads]: https://www.npmjs.com/package/@nodecfdi/cfdi-core
[badge-source]: https://img.shields.io/badge/source-nodecfdi/cfdi--core-blue.svg?logo=github
[badge-node-version]: https://img.shields.io/node/v/@nodecfdi/cfdi-core.svg?logo=nodedotjs
[badge-discord]: https://img.shields.io/discord/459860554090283019?logo=discord
[badge-release]: https://img.shields.io/npm/v/@nodecfdi/cfdi-core.svg?logo=npm
[badge-license]: https://img.shields.io/github/license/nodecfdi/cfdi-core.svg?logo=open-source-initiative
[badge-build]: https://img.shields.io/github/actions/workflow/status/nodecfdi/cfdi-core/build.yml?branch=main
[badge-reliability]: https://sonarcloud.io/api/project_badges/measure?project=nodecfdi_cfdi-core&metric=reliability_rating
[badge-maintainability]: https://sonarcloud.io/api/project_badges/measure?project=nodecfdi_cfdi-core&metric=sqale_rating
[badge-coverage]: https://img.shields.io/sonar/coverage/nodecfdi_cfdi-core/main?logo=sonarcloud&server=https%3A%2F%2Fsonarcloud.io
[badge-violations]: https://img.shields.io/sonar/violations/nodecfdi_cfdi-core/main?format=long&logo=sonarcloud&server=https%3A%2F%2Fsonarcloud.io
[badge-downloads]: https://img.shields.io/npm/dm/@nodecfdi/cfdi-core.svg?logo=npm
