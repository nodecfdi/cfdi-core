# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [v2.0.0](https://github.com/nodecfdi/cfdi-core/compare/v1.0.1...v2.0.0)

### Commits

- refactor: :recycle: configure project tooling, dependencies, and code style settings [`850660f`](https://github.com/nodecfdi/cfdi-core/commit/850660f98647171a2c037cf889a6a1db5e76edfd)
- chore: :wastebasket: remove documentation files [`d6b966b`](https://github.com/nodecfdi/cfdi-core/commit/d6b966bfb97aa31821ed9a558d82120cd10ceed4)
- feat: :sparkles: add currency decimals, version discovery, and formatting utilities [`80c7ba9`](https://github.com/nodecfdi/cfdi-core/commit/80c7ba9e3e72db73f1ff55a227708c7f7e79caee)
- docs: :memo: add comprehensive documentation and quick start guide [`d3f2b55`](https://github.com/nodecfdi/cfdi-core/commit/d3f2b5512882d29af9f889ffd4d68f4941cafabd)
- chore: :arrow_up: update dependencies and package manager version in package.json [`1e8a687`](https://github.com/nodecfdi/cfdi-core/commit/1e8a68768db55475c5f40419235952d51b06a57d)
- refactor: :recycle: optimize xml node sorting, currency lookups, and capital regimen removal [`6a1137b`](https://github.com/nodecfdi/cfdi-core/commit/6a1137b5aa082dfe0a4ba502aff0b4067ac8b363)
- refactor: :recycle: improve code style and formatting across codebase [`b9a08f1`](https://github.com/nodecfdi/cfdi-core/commit/b9a08f1803ac55f17b8124c342f322812fb8d34c)
- refactor: :recycle: remove old config files for tool code [`4d78b92`](https://github.com/nodecfdi/cfdi-core/commit/4d78b926ead3c6815f3dd62683ea47f79e2522b4)
- refactor: :recycle: replace jest-xml-matcher with custom vitest xml matcher [`64bce26`](https://github.com/nodecfdi/cfdi-core/commit/64bce2657ade5a190ba3964445f34936e093a006)
- feat: :sparkles: add generic typing support for XML node and attribute names [`a619abc`](https://github.com/nodecfdi/cfdi-core/commit/a619abc31e5106ae1810bac65f2081bbaf0f9115)
- ci: :green_heart: add GitHub Actions workflows and update SonarCloud configuration [`909e186`](https://github.com/nodecfdi/cfdi-core/commit/909e186c0738815d73eb732e67f277bd32b34170)
- refactor: :recycle: replace subpath imports with relative paths [`281986d`](https://github.com/nodecfdi/cfdi-core/commit/281986d86f29f841cf2ab4fb43ff1086e2342d4d)
- refactor: :recycle: remove github workflows and update husky commit-msg command [`a27ed1c`](https://github.com/nodecfdi/cfdi-core/commit/a27ed1c3c772ca29d7f65225826c0cc68979007f)
- docs: :memo: add v1 to v2 upgrade guide [`e3ac4ab`](https://github.com/nodecfdi/cfdi-core/commit/e3ac4ab9d321a3c83d1f520480c85e845dc41e9f)
- build: :construction_worker: add IIFE browser build configuration to tsdown config [`217ec1b`](https://github.com/nodecfdi/cfdi-core/commit/217ec1b17dc6b2f0660751cd01df3d0ee936062e)
- refactor: :recycle: migrate package manager to pnpm 12, update node engines [`93fedfc`](https://github.com/nodecfdi/cfdi-core/commit/93fedfcef5db9f73ea2769f316633b689be40bc1)
- docs: :memo: update README with new documentation links and remove outdated notices [`f741bbc`](https://github.com/nodecfdi/cfdi-core/commit/f741bbce1e1256e43844f8b92377aced88468ed0)
- refactor: :recycle: rename test files to use .test.ts and relocate test helpers [`12189a7`](https://github.com/nodecfdi/cfdi-core/commit/12189a7cacc7ab565a3ff018d6a37f4cd4947200)

## [v1.0.1](https://github.com/nodecfdi/cfdi-core/compare/v1.0.0...v1.0.1) - 2025-06-23

### Commits

- chore(release): :tada: 1.0.1 [`b4bd025`](https://github.com/nodecfdi/cfdi-core/commit/b4bd02518c44d1cf36154648866a028f92c7c596)
- chore: :arrow_up: update dependencies [`d548a5d`](https://github.com/nodecfdi/cfdi-core/commit/d548a5dab2d0a5ee5cf70939d5692a89b4adbeac)
- style: :rotating_light: resolve issues reported by eslint and prettier [`b7a6277`](https://github.com/nodecfdi/cfdi-core/commit/b7a62772b2a46e1dd85fa5d72433ed5770d34027)
- docs: :memo:  - update readme with legend only esm [`286227d`](https://github.com/nodecfdi/cfdi-core/commit/286227dc60a3853ce1286e357eaf89d847d35ebf)

## [v1.0.0](https://github.com/nodecfdi/cfdi-core/compare/v0.6.2...v1.0.0) - 2025-04-23

### Commits

- docs: :memo:  - change generation of docs using github theme [`bb35251`](https://github.com/nodecfdi/cfdi-core/commit/bb3525116379be498d9b172b1b17d2ffaa812eb4)
- chore(release): :tada: 1.0.0 [`2c02751`](https://github.com/nodecfdi/cfdi-core/commit/2c02751dbc68403da03d0e9452b77a31850b6692)
- build: :construction:  - update build for usage tsup and replace index on root [`d09c7a5`](https://github.com/nodecfdi/cfdi-core/commit/d09c7a54a3fcb64296c813ab5aa31b56300661cf)
- feat: :sparkles:  - add support to cdata section element [`347aaf1`](https://github.com/nodecfdi/cfdi-core/commit/347aaf148c625eb55874e5640565d48297ba00b3)
- style: :lipstick:  - resolve issues reported by eslint and prettier [`fbe8b16`](https://github.com/nodecfdi/cfdi-core/commit/fbe8b16aad0fdb855002be3bdbc1306a2ba4835f)
- chore: :green_heart:  - update ci workflows for build and sonarcloud [`7918750`](https://github.com/nodecfdi/cfdi-core/commit/7918750fc0f3063fdfd6ecd1165c445031f148e9)

## [v0.6.2](https://github.com/nodecfdi/cfdi-core/compare/v0.6.1...v0.6.2) - 2024-10-14

### Commits

- chore(release): :tada: 0.6.2 [`d8e2270`](https://github.com/nodecfdi/cfdi-core/commit/d8e2270a3d79418d5f38f7ab52b369c48edb1ae9)
- chore: :arrow_up: update dependencies [`4d6e4eb`](https://github.com/nodecfdi/cfdi-core/commit/4d6e4ebc4a5e59fb9199af5143c47328d707f122)
- style: :rotating_light: enable sonarjs in eslint and resolve all issues reported by eslint [`e36e9a6`](https://github.com/nodecfdi/cfdi-core/commit/e36e9a6e46e6abb20e6ea01ed6b17ae517537aa8)

## [v0.6.1](https://github.com/nodecfdi/cfdi-core/compare/v0.6.0...v0.6.1) - 2024-10-04

### Commits

- refactor: :recycle: remove old doc generate files [`81c252d`](https://github.com/nodecfdi/cfdi-core/commit/81c252d7c1b99787bc50af0a274970255128ad82)
- chore(release): :tada: 0.6.1 [`ae3b891`](https://github.com/nodecfdi/cfdi-core/commit/ae3b891cff748e84b9a030697b204b8749522242)
- perf: :zap: remove unnecessary export package.json file [`af6403b`](https://github.com/nodecfdi/cfdi-core/commit/af6403b65c0caf962835f8f89417cf54e11fca16)
- style: :rotating_light: resolve issue reported by sonarcloud for readonly property [`f676552`](https://github.com/nodecfdi/cfdi-core/commit/f6765526ef5b9dc471346e8c6c5eb129da4a6752)

## [v0.6.0](https://github.com/nodecfdi/cfdi-core/compare/v0.5.1...v0.6.0) - 2024-10-04

### Commits

- chore(release): :tada: 0.6.0 [`cf994bf`](https://github.com/nodecfdi/cfdi-core/commit/cf994bf909a42c4b9e8d380c52fcbc9deb74c8a8)
- refactor: :recycle: remove browser dom types and usage types provider by xmldom for usage in node [`8abe386`](https://github.com/nodecfdi/cfdi-core/commit/8abe386cdb14cde11b4c60dbe3d814f0aca728b6)
- chore: :arrow_up: update dependencies and usage latest xml-dom release [`7ca449c`](https://github.com/nodecfdi/cfdi-core/commit/7ca449ca24c3f84918c401f33bf44c0182563dea)
- feat: :sparkles: add latest exports by xml-dom [`55a1c6d`](https://github.com/nodecfdi/cfdi-core/commit/55a1c6db38812fbcdeb0e275d7290858f4ac3ad8)

## [v0.5.1](https://github.com/nodecfdi/cfdi-core/compare/v0.5.0...v0.5.1) - 2024-09-04

### Commits

- chore(release): :tada: 0.5.1 [`de36aaf`](https://github.com/nodecfdi/cfdi-core/commit/de36aafd2ccf79624472c03fb6d6ed51dd020535)
- chore: :arrow_up: update dependencies, add support to eslint 9 and update changelog tool generator [`527cec7`](https://github.com/nodecfdi/cfdi-core/commit/527cec76f9fa9f693b9b9ffab3091d5a00036b3d)
- refactor: :recycle: apply refactor for usage xmlns namespace enum on xmlnode importe [`8c3de81`](https://github.com/nodecfdi/cfdi-core/commit/8c3de81f9cf6543425bd7b5dec4d9bc7cc5da070)

## [v0.5.0](https://github.com/nodecfdi/cfdi-core/compare/v0.4.3...v0.5.0) - 2024-08-14

### Commits

- chore(release): :tada: 0.5.0 [`849c98e`](https://github.com/nodecfdi/cfdi-core/commit/849c98edbaef4934642c3a4218b9d37ab3239255)
- perf: :sparkles: add shared enums from xmldom [`f5bf2e0`](https://github.com/nodecfdi/cfdi-core/commit/f5bf2e0e977c1b1443a6c4633156f557a278af3e)

## [v0.4.3](https://github.com/nodecfdi/cfdi-core/compare/v0.4.2...v0.4.3) - 2024-08-12

### Commits

- chore(release): :tada: 0.4.3 [`caa0f5e`](https://github.com/nodecfdi/cfdi-core/commit/caa0f5e173568413a74de027d8b55f191154396d)
- fix: :bug: resolve problem with bad definition type using xmldom [`5b41f1f`](https://github.com/nodecfdi/cfdi-core/commit/5b41f1f2b4f02769d3050c3bf9e1d39c5905501a)

## [v0.4.2](https://github.com/nodecfdi/cfdi-core/compare/v0.4.1...v0.4.2) - 2024-08-12

### Commits

- chore(release): :tada: 0.4.2 [`ee88b4b`](https://github.com/nodecfdi/cfdi-core/commit/ee88b4bad1d6e321f7066ea28562db4d6209c24c)
- fix: :bug: resolve bad generation of dom implementation in core [`f732904`](https://github.com/nodecfdi/cfdi-core/commit/f732904c0462930e42a2e3d5f754c9a805458a6a)
- chore: :arrow_up: update dependencies [`6113524`](https://github.com/nodecfdi/cfdi-core/commit/6113524df12fc5d20caa63014c32792aee58d301)

## [v0.4.1](https://github.com/nodecfdi/cfdi-core/compare/v0.4.0...v0.4.1) - 2024-08-08

### Commits

- chore(release): :tada: 0.4.1 [`735b501`](https://github.com/nodecfdi/cfdi-core/commit/735b501dbaa6930174586b80259390b1e0a34ada)
- chore: :arrow_up: update dependencies [`6eb4264`](https://github.com/nodecfdi/cfdi-core/commit/6eb4264b926bc2ac17d199a5518a5a3428251ef3)
- refactor: :recycle: use latest exports of library xmldom [`4589af1`](https://github.com/nodecfdi/cfdi-core/commit/4589af1db47454697acf0daf4a4f902609900c81)
- test: :test_tube: add more tests for format number [`cd067e9`](https://github.com/nodecfdi/cfdi-core/commit/cd067e9c1d7474bcf71fa47b1bb21ba1a912225d)
- fix: :bug: resolve problem with bad declaration file on lib xmldom [`15ae0ad`](https://github.com/nodecfdi/cfdi-core/commit/15ae0ad83ef6322c5a819db86e9be58d8d5fb2dd)

## [v0.4.0](https://github.com/nodecfdi/cfdi-core/compare/v0.3.1-0...v0.4.0) - 2024-07-28

### Commits

- chore(release): :tada: 0.4.0 [`65d36b1`](https://github.com/nodecfdi/cfdi-core/commit/65d36b16e68b1ded7f44a8ae5916b8fab625ba20)
- feat: :sparkles: add number utility helpers [`cf302df`](https://github.com/nodecfdi/cfdi-core/commit/cf302df361316bd6a679f607799c16a4a90ad1cc)
- fix: :bug: resolve problems reported by sonarcloud [`f73db27`](https://github.com/nodecfdi/cfdi-core/commit/f73db277430f59e1508c7f99d275f5767e3837d3)
- chore: :arrow_up: update dependencies [`c17861d`](https://github.com/nodecfdi/cfdi-core/commit/c17861dcc63d5f3cdb43ed2b5957235681f15143)

## [v0.3.1-0](https://github.com/nodecfdi/cfdi-core/compare/v0.3.0...v0.3.1-0) - 2024-07-25

### Commits

- chore(release): :tada: 0.3.1-0 [`5a175f8`](https://github.com/nodecfdi/cfdi-core/commit/5a175f8573891cb68ad4e2fa69a50b5f901bd58d)
- refactor: :recycle: intent usage of paths using package.json imports [`a3a394c`](https://github.com/nodecfdi/cfdi-core/commit/a3a394c7fdd2458cfffee11f39ae29ca420ec0f9)
- chore: :arrow_up: update dependencies and apply changes for latest releases [`ce1a1cd`](https://github.com/nodecfdi/cfdi-core/commit/ce1a1cd734ce65f3b3a2a2e3b9e4bbb54abae636)
- chore: :construction: add typecheck on prebuild files [`6e7b918`](https://github.com/nodecfdi/cfdi-core/commit/6e7b918c495ded56c59511af4f6ef2e76cd5dcbc)

## [v0.3.0](https://github.com/nodecfdi/cfdi-core/compare/v0.2.0...v0.3.0) - 2024-07-09

### Commits

- chore(release): :tada: 0.3.0 [`abcf944`](https://github.com/nodecfdi/cfdi-core/commit/abcf94452fc9442123e9509c1ad70a3c47318a2d)
- test: :white_check_mark: add test of alias has of attributes in XmlNode [`598fbf1`](https://github.com/nodecfdi/cfdi-core/commit/598fbf1966e8795420df27b86a7e14239aef4927)
- feat: :sparkles: add method hasAttribute on xml node and xml node interface [`4c1297b`](https://github.com/nodecfdi/cfdi-core/commit/4c1297be225ea8be360c2938adbb3d6bba9f8d5d)
- chore: :green_heart: resolve problem with generate and add docs on git [`54c9471`](https://github.com/nodecfdi/cfdi-core/commit/54c94712f8882d4846319dcfb2564f4e430f0d74)

## [v0.2.0](https://github.com/nodecfdi/cfdi-core/compare/v0.1.1...v0.2.0) - 2024-07-08

### Commits

- docs: :memo: generate docs and good output [`ccc0b5d`](https://github.com/nodecfdi/cfdi-core/commit/ccc0b5d2c816a318c875285d86e5a23bf73d0c0a)
- build: :wrench: update workflow for generate publish apps remove dev ref [`14ba615`](https://github.com/nodecfdi/cfdi-core/commit/14ba6153ae33b2ab7dbc901b678af30adc5603f8)
- chore(release): :tada: 0.2.0 [`9951b47`](https://github.com/nodecfdi/cfdi-core/commit/9951b478bf29e3f253d59b5dfdc63e36a3595162)
- chore: :memo: update changelog with conventional commits [`0b0ac48`](https://github.com/nodecfdi/cfdi-core/commit/0b0ac485f2c01527581ad610687ce97689a5fb76)

## [v0.1.1](https://github.com/nodecfdi/cfdi-core/compare/v0.1.0...v0.1.1) - 2024-07-03

### Merged

- v0.1.1 [`#1`](https://github.com/nodecfdi/cfdi-core/pull/1)

### Commits

- docs: :memo: generate docs [`5fa869e`](https://github.com/nodecfdi/cfdi-core/commit/5fa869edc6e36c68cdef422f398364e963ba9ac0)
- chore: :arrow_up: update dependencies [`951b2d2`](https://github.com/nodecfdi/cfdi-core/commit/951b2d2533e9e8d2967a5a2bf671e25ee6f7b501)
- ci: :green_heart: move to usage test workflow on organization [`c93c71a`](https://github.com/nodecfdi/cfdi-core/commit/c93c71a3a313b5c86aab99a4cd45a66388f15d7a)
- docs: :memo: update readme with target docs link [`d7abde9`](https://github.com/nodecfdi/cfdi-core/commit/d7abde9a58618457ee813402da274b9c92c851dd)
- chore: :arrow_up: update dependencies [`aab99fd`](https://github.com/nodecfdi/cfdi-core/commit/aab99fdee15f109d0cb88b1fe5a1d3a548ce7fdd)
- chore(release): :tada: 0.1.1 [`0d76364`](https://github.com/nodecfdi/cfdi-core/commit/0d76364d05d669b6b4589faad0a9e8a03fba18dd)
- style: :rotating_light: resolve eslint config and reported rule with latest eslint update [`275d867`](https://github.com/nodecfdi/cfdi-core/commit/275d8671883b3b39e69199052c4a7b24d459c64b)
- chore(release): :tada: 0.1.1 [`86a038d`](https://github.com/nodecfdi/cfdi-core/commit/86a038ded214109f4d970878f965cb84007f4ff5)

## v0.1.0 - 2024-04-21

### Commits

- docs: :memo: add generate docs with typedoc [`5f26bf7`](https://github.com/nodecfdi/cfdi-core/commit/5f26bf741c9129344db398f723abbe1fa629dd73)
- feat: :sparkles: add xml nodes, xml utils and dom utils [`68ec272`](https://github.com/nodecfdi/cfdi-core/commit/68ec272a1a94b658a01da62b22a4be546e1800ec)
- docs: :memo: add missing doc files [`62befa8`](https://github.com/nodecfdi/cfdi-core/commit/62befa8adba6e3664d9c8f0e2ca4f1b12113331d)
- revert: :rewind: remove code of conduct, contributing and version bump [`0c93d4b`](https://github.com/nodecfdi/cfdi-core/commit/0c93d4b4337cde6021643754d2b5479e99aa7a04)
- docs: :memo: add readme and more topics in package.json [`f0cf547`](https://github.com/nodecfdi/cfdi-core/commit/f0cf547e31ffc0f7868a7fb56e9c9688c9de1ecc)
- build: :building_construction: resolve scaffold for generate build files with tsup [`ef265a6`](https://github.com/nodecfdi/cfdi-core/commit/ef265a67dcc29b3627b9c1879a41ea18f106293f)
- build: :construction_worker: add changesets and update ci for release a new version on npm [`671f122`](https://github.com/nodecfdi/cfdi-core/commit/671f122609b66490c1858a2677c62e61bdf3688e)
- ci(workflow): :green_heart: fix sonarcloud and coverage [`de908a9`](https://github.com/nodecfdi/cfdi-core/commit/de908a9d708a287385d2ba6d97ac67f852cce081)
- ci: :green_heart: add build ci without publish package only run tests and quality code tools [`c8022ce`](https://github.com/nodecfdi/cfdi-core/commit/c8022cefde3d0ffb28b7d8c075f5938e262582ee)
- ci(workflow): :green_heart: add sonarcloud and update node versions support [`ee2147f`](https://github.com/nodecfdi/cfdi-core/commit/ee2147f1ad48fcde159faca1ed867b749d0b4d3d)
- chore: :rocket: version bump 0.1.0 [`20609c9`](https://github.com/nodecfdi/cfdi-core/commit/20609c98f8ab8980910f8660214980a376f1f0b3)
- revert(changelog): :rewind: again revert all version bump and changelog [`683ee07`](https://github.com/nodecfdi/cfdi-core/commit/683ee074c8daf8f1e377e75a15fcf1b6c73e2f56)
- style: :technologist: after generate changelog apply format and add file in git [`2d85617`](https://github.com/nodecfdi/cfdi-core/commit/2d85617be264ede93379e99559f99b80e6c23749)
- docs(changelog): :memo: update changelog [`11c08f6`](https://github.com/nodecfdi/cfdi-core/commit/11c08f651d2abacc62894edec5e8b2a9c7d58145)
- fix: :bug: resolve problem with pnpm and standalone setup [`64caf9d`](https://github.com/nodecfdi/cfdi-core/commit/64caf9df46f45a9f4985c070114351dbba768ddb)
- chore: :technologist: add automatic generator of changelog by commits [`5fda2e2`](https://github.com/nodecfdi/cfdi-core/commit/5fda2e2f4d5ff0bc58537ab4c9cf3881440fe386)
- fix: :bug: add missing dev dependency types node [`3e5263e`](https://github.com/nodecfdi/cfdi-core/commit/3e5263e3efa344f0837cb62e77e7db4cd94d5af0)
