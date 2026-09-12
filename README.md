Portfolio — Jérémie Landry Djoko
Portfolio personnel présentant mon profil de Cyber Security Engineer & Full-Stack Developer : projets, compétences et parcours.
🔗 Site en ligne : jeremiedjoko.vercel.app
Aperçu
Site vitrine en une page, avec une hero section 3D interactive, une présentation des compétences (cybersécurité, développement, design), une sélection de projets avec problème/solution/résultat, et un système de traduction FR/EN complet.
Stack technique
Front-end : React 19, Tailwind CSS, Framer Motion (animations)
3D : Three.js, @react-three/fiber, @react-three/drei, Spline (robot 3D en hero)
Contact : EmailJS (envoi de messages sans backend)
i18n : Contexte React maison (`LangContext`) avec dictionnaire FR/EN centralisé (`translations.js`)
Data : contenu (profil, compétences, projets) centralisé dans `portfolioData.js`, découplé des composants
Structure du projet
```
src/
├── components/      # Composants UI réutilisables
├── sections/        # Sections de la page (Hero, About, Skills, Projects, Experience, Contact, Footer)
├── data/             # portfolioData.js (contenu), translations.js (FR/EN), LangContext.js
├── three/            # Éléments et logique 3D
├── hooks/            # Hooks personnalisés
└── context/          # Contextes React
```
Installation
```bash
git clone https://github.com/jeremiedjoko/portfolio-jeremie.git
cd portfolio-jeremie
npm install
npm start
```
Ouvre http://localhost:3000 pour voir le site en local.
Build de production
```bash
npm run build
```
---
<details>
<summary>Notes techniques Create React App (générées automatiquement)</summary>
Available Scripts
In the project directory, you can run:
`npm start`
Runs the app in the development mode.  
Open http://localhost:3000 to view it in your browser.
The page will reload when you make changes.  
You may also see any lint errors in the console.
`npm test`
Launches the test runner in the interactive watch mode.  
See the section about running tests for more information.
`npm run build`
Builds the app for production to the `build` folder.  
It correctly bundles React in production mode and optimizes the build for the best performance.
The build is minified and the filenames include the hashes.  
Your app is ready to be deployed!
See the section about deployment for more information.
`npm run eject`
Note: this is a one-way operation. Once you `eject`, you can't go back!
If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.
Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.
You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.
Learn More
You can learn more in the Create React App documentation.
To learn React, check out the React documentation.
Code Splitting
This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting
Analyzing the Bundle Size
This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size
Making a Progressive Web App
This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app
Advanced Configuration
This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration
Deployment
This section has moved here: https://facebook.github.io/create-react-app/docs/deployment
`npm run build` fails to minify
This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
</details>
