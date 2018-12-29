// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
 //@Environment https://console.firebase.google.com/u/0/project/books-store-lesson-1d68c/overview
 firebase: {
   apiKey: "AIzaSyD8gBk3-ASsM8L_ugBn_K8SQP5paPUG9Dw",
   authDomain: "books-store-lesson-1d68c.firebaseapp.com",
   databaseURL: "https://books-store-lesson-1d68c.firebaseio.com",
   projectId: "books-store-lesson-1d68c",
   storageBucket: "books-store-lesson-1d68c.appspot.com",
   messagingSenderId: "143227342681"
 }
};
