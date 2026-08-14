# MorningFit — Gerador de Treino Matinal Rápido

Projeto mobile-first em HTML, CSS e JavaScript puro.

## Funcionalidades
- 10, 15 ou 20 minutos.
- Intensidade Mobilidade ou Cardio forte.
- Circuito automático e sorteio de exercícios.
- Cronômetro Tabata: 40s exercício + 20s descanso.
- Controles iniciar, pausar e reiniciar.
- Sinais sonoros com Web Audio.
- Login Google preparado para Firebase.
- Painel ADM reservado ao e-mail `lorielsilvadosreis014@gmail.com`.

## Login Google real
O arquivo `firebase-config.js` contém os campos para colocar as credenciais do Firebase.

Para produção, não confie apenas em esconder o painel no JavaScript. Use Firebase Authentication + Firestore/Security Rules ou um backend para validar permissões de administrador.

## Rodar
Abra `index.html` em um navegador para testar a parte do treino. Para login Google real, publique em um domínio autorizado pelo Firebase e configure o SDK de autenticação.

## Observação
Os exercícios são sugestões gerais. O usuário deve adaptar a intensidade e interromper se sentir dor ou mal-estar.
