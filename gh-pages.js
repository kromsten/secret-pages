import { publish } from 'gh-pages';

publish(
 'build',
 {
  branch: 'gh-pages',
  repo: 'git@github.com:kromsten/script-pages.git', // Update to point to your repository
  user: {
   name: 'Martin', // update to use your name
   email: 'kromsten@pm.me' // Update to use your email
  },
  dotfiles: true
  },
  () => {
   console.log('Deploy Complete!');
  }
);