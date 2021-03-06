# oasp4js-rev



[![Maven Central](https://maven-badges.herokuapp.com/maven-central/com.github.oasp-forge/oasp4js-rev/badge.svg?style=flat-square)]()


|Branch|Build status|Test coverage|
|---|---|---|
|development|[![Build Status](https://travis-ci.org/oasp-forge/oasp4js-rev.svg?branch=development)](https://travis-ci.org/oasp-forge/oasp4js-rev)|[![Coverage Status](https://coveralls.io/repos/github/oasp-forge/oasp4js-rev/badge.svg?branch=development)](https://coveralls.io/github/oasp-forge/oasp4js-rev?branch=development)|
|master|[![Build Status](https://travis-ci.org/oasp-forge/oasp4js-rev.svg?branch=master)](https://travis-ci.org/oasp-forge/oasp4js-rev)|[![Coverage Status](https://coveralls.io/repos/github/oasp-forge/oasp4js-rev/badge.svg?branch=master)](https://coveralls.io/github/oasp-forge/oasp4js-rev?branch=master)|



##What this app is about?

The sample-app is a management of a restaurant. Users will log in in the app, so they can perform some actions on it (always depending on their profile). 

4 different views are able to be used/navigated:
- Login: First view of the application where you have to insert a correct pair user/password to access the private part of the application, depending on the credentials, you will have different permissions. Once you are in, you can return to this view by "log off" button on the header.
- Tables: It will be a CRUD that will contain data about the tables in the restaurant, as well as their own attributes such as the state of each one of them (FREE/RESERVED/OCCUPIED).
- Details/Edit: This view will be displayed from "Tables", clicking on "Edit" button when a table's already selected. It will contain another CRUD of commands asked on that Table. So it will be possible to add some more, remove, and so on.
- Kitchen: Management of the states of the table commands. Every action that is performed on Details view will have its reflect on this view. It will be possible to perform some actions over those commands as well, such as "cancel" (when they are ready).

There will be 3 kind of users:
- Chief (username:"chief"/password:"chief") : Access to both Tables and Kitchen views.
- Cook ("cook"/"cook") : Access only to Kitchen view
- Waiter ("waiter/waiter") : Access only to Tables view

##Which technologies are in use?

As we are developing this sample-app in **Angular2**, we are forced to use an environment on which TypeScript can be supported, so we use **Atom**. It allows us to install packages from the environment itself. **TypeScript** is being the main language on the development of the this application, but also HTML and CSS with angular2 elements. To run our code and to install packages, we've been using the **NPM** of **Nodejs**. Finally, the browser we're using is **Chrome**, which is being very useful not only in running apps, but in debugging as well.

##How to start running it locally? (step by step)

1. Install Atom and Node.js (we use "npm" for running, testing and installing). We've followed the next video: https://www.youtube.com/watch?v=_-CD_5YhJTA
2. Clone oasp4js-rev repo to a local folder. We will be commiting to the "Development" branch (default branch of the repo)
3. Open CMD and go to repo's folder, where you will have the sample-app project called 'oasp4js-sample'
4. Write `npm install` on CMD. Every dependecy specified on `package.json` will be installed.
5. Writing `npm start` on CMD will run the proyect, so you'll can see your Application on the browser, located in `localhost:4200`.

##How to run tests

Tests will be use to verify the integrity of the code within a component or with others. The tool we use to fire those tests is **Karma**, which was developed by the Angular2 team as well. Those tests implemented in Jasmine, a behavior-driven development framework for testing JavaScript code. You can find information about syntax and how they can be implemented in Issue [#10](../../issues/10) .

Every time we commit to this repository, Travis CI evaluate our code and execute those tests we've implemented. Those files will have the following format:

`[component].spec.ts`

In order to commit as verified as possible, we also use the `npm test` to run tests locally. If they run correctly, we push them to the repo (although "running correctly" may mean that the test is failing, but always compiling).
