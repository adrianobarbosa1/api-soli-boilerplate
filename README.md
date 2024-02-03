# App

node fastofy typescript boilerplate api

GymPass style app.

## RFs (Requisitos funcionais)

- [ ] Deve ser possível se cadastrar.
- [ ] Deve ser possível se autenticar.
- [ ] Deve ser possível obter o perfil de um usuário logado
- [ ] Deve ser possível obter o número de check-ins realizado pelo user logado.
- [ ] Deve ser possível o usuário obter seu historico de checkin
- [ ] Deve ser possível o usuário buscar academias próximas
- [ ] Deve ser possível o usuário buscar academias pelo nome
- [ ] Deve ser possível o usuário realizar checkin em uma academia
- [ ] Deve ser possível validar o chekin de um usuário
- [ ] Deve ser possível se cadastrar uma academia.

## RNs (Regras de negócio)

- [ ] O usuário não deve poder se cadastrar com um email duplicado
- [ ] o usuário não pode fazer 2 checkins no mesmo dia
- [ ] o usuário não pode fazer chekin se não tiver perto 100m da academia
- [ ] o chekin só pode ser validado até 20 minutos após criado
- [ ] O chekin só pode ser validado por administradores
- [ ] A academia só pode ser cadastrada por administradores

## RNFs (Requisitos não-funcionais)

- [ ] A senha do usuário precisa estár criptografada
- [ ] Os dados da aplicação precisam estar persistidos em um banco postgress
- [ ] todas as listas de dados precisam esta paginada com 20 itens por pagina
- [ ] o usuário deve ser identificado por um JWT
