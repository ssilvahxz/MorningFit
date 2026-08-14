/*
  CONFIGURAÇÃO DO FIREBASE
  1. Crie um projeto no Firebase.
  2. Ative Authentication > Sign-in method > Google.
  3. Cadastre seu domínio em Authentication > Settings > Authorized domains.
  4. Cole aqui as configurações do seu app Web.
  5. Para segurança real do ADM, valide o usuário no backend/Firebase Rules.
*/
window.FIREBASE_CONFIG = {
  apiKey: "COLE_SUA_API_KEY",
  authDomain: "SEU-PROJETO.firebaseapp.com",
  projectId: "SEU-PROJETO",
  storageBucket: "SEU-PROJETO.firebasestorage.app",
  messagingSenderId: "SEU_MESSAGING_SENDER_ID",
  appId: "SEU_APP_ID"
};
