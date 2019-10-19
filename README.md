# BookNicoAngular

Projet créé à partir du tuto openclassroom suivant : https://openclassrooms.com/fr/courses/4668271-developpez-des-applications-web-avec-angular/5091266-creez-une-application-complete-avec-angular-et-firebase
Ce projet utilise firebase comme serveur de base de données.

## Firebase

Allez à firebase.com, créez un compte Google ou authentifiez-vous si vous en avez déjà un, et créez un nouveau projet Firebase.  Vous pouvez le domicilier dans votre pays de résidence et lui donner le nom que vous voulez.
Pour cette application, vous allez créer un nouveau projet sur Firebase.
Choisissez "Ajouter Firebase à votre application Web" et copiez-collez la configuration dans un fichier nommé 'firebase.config.ts' dans le repertoire 'config' de votre application comme suit :
```
export 	const firebaseConfig = {
      apiKey: 'AIzaSyCwfa_fKNCVrDMR1E88S79mpQP-6qertew4',
      authDomain: 'bookshelves-3d570.firebaseapp.com',
      databaseURL: 'https://bookshelves-3d570.firebaseio.com',
      projectId: 'bookshelves-3d570',
      storageBucket: 'bookshelves-3d570.appspot.com',
      messagingSenderId: '6634573823'
      appId: "1:4681132:web:0518b8a4ca31d39"
		};
```

Cette application utilise l'authentification par adresse mail et mot de passe proposée par Firebase.  Pour cela, il faut d'abord l'activer dans la console Firebase 

## CLI

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.2.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
