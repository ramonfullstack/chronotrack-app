# Wisemoney Anticipation

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.0.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Padrão do Projeto
[Estruturando Projeto Angular](https://www.brunobrito.net.br/estruturando-components-angular/)

[Projeto Dashboard Angular 01](https://github.com/JoaoPedroMoraes/dashboard-angular-material)

[Projeto Dashboard Angular 02](https://github.com/brunohbrito/JPProject.IdentityServer4.AdminUI)

## Comando CLI
- Criar Modulo no sistema:
````bash
ng generate module modules/<nome-do-modulo> --route <nome-da-rota> --module app.module
````

- Gerar Page do modulo:
````bash
ng generate module modules/<nome-do-modulo>/<nome-pagina> --route <nome-da-rota> --module modules/<nome-do-modulo>/<nome-do-modulo>.module
````

- Criar Teste E2E:
````bash
ng generate @cypress/schematic:e2e --name=login
````

- Criar Teste E2E especificando a pasta de destino:
````bash
ng generate @cypress/schematic:e2e --name=login --path=src/app/tests
````