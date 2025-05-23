# My Canvas Editor

Developed by: Artur Souza (Artartur)

Description: A canvas editor, where you can generate elements (stars or rectangles) and you can edit it, its borders, colors, incrise length points and number of points. Also you can clean all the board/canvas.

Architecture: NgModules. It's an architecture I'm already used to working with. It helps keep things organized and makes it easier to scale the project in the future, if needed. The choice of this architecture was mostly a matter of personal preference and experience with the modular approach.

## How to install and run

- Run git clone ```git@github.com:Artartur/my-canvas-editor.git``` in your terminal
- Go to ```my-canvas-editor/``` directory
- Run ```npm install -g @angular/cli```
- Run ```npm install``` to install all dependencies
- Run ```ng serve```
- In your browser navigate to ```localhost:4200```
- Now, you can play

## Versions

Angular CLI: 19.2.12
Node: 20.13.1
Package Manager: npm 10.5.2

## Project structure

├── .editorconfig
├── .gitignore
├── .vscode
    ├── extensions.json
    ├── launch.json
    └── tasks.json
├── README.md
├── angular.json
├── package-lock.json
├── package.json
├── src
    ├── app
    │   ├── _interfaces
    │   │   ├── rectangle.ts
    │   │   └── svg.ts
    │   ├── _services
    │   │   ├── select.service.spec.ts
    │   │   └── select.service.ts
    │   ├── app-routing.module.ts
    │   ├── app.component.html
    │   ├── app.component.scss
    │   ├── app.component.spec.ts
    │   ├── app.component.ts
    │   ├── app.module.ts
    │   ├── canvas
    │   │   ├── canvas.component.html
    │   │   ├── canvas.component.scss
    │   │   ├── canvas.component.spec.ts
    │   │   └── canvas.component.ts
    │   ├── rectangle-controls
    │   │   ├── rectangle-controls.component.html
    │   │   ├── rectangle-controls.component.scss
    │   │   ├── rectangle-controls.component.spec.ts
    │   │   └── rectangle-controls.component.ts
    │   └── star-controls
    │   │   ├── star-controls.component.html
    │   │   ├── star-controls.component.scss
    │   │   ├── star-controls.component.spec.ts
    │   │   └── star-controls.component.ts
    ├── index.html
    ├── main.ts
    └── styles.scss
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.spec.json
└── yarn.lock
