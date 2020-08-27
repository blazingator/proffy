# Proffy - platforma de estudos online
## Feito durante a Segunda Edição da NextLevelWeek realizada pela [Rocketseat](https://rocketseat.com.br/)
 
## Instruções de como 'rodar' projeto
```sh
  git clone https://github.com/nooobdojs/proffy.git
  cd proffy/server
  
  npm install
  npm start
```
> Servidor inicia em localhost:3333

## Rotas da api                  
- /connections | POST | GET
- /classes | POST
- /classes | GET
  - parametros:  
    - week_day: inteiro [0,6]
    - subject: texto
    - time: inteiro


### Front End Web
```sh
  cd ../web  
  npm install
  npm start
```
> Servidor inicia em localhost:3000

### App mobile
```sh
  cd ../mobile

  npm install
  npm start # com expo-cli installada
```
> Abra o cliente do expo e escaneio QR Code


