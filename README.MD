# Desafio prático EWAlly

Este repositório contém o exame prático EWAlly.

## Desafio

 - Queremos poder através da aplicação consultar linhas digitáveis de boleto de título bancário
e pagamento de concessionárias, verificando se a mesma é válida ou não. Sendo válida e
possuindo valor e/ou data de vencimento ter o retorno desses dados.

 - O teste consiste em escrever um programa em Node.js que expõe uma API na qual é dada
como entrada uma linha digitada de um boleto e que retorna:
status: 200 para linha válida ou 400 para linha inválida
amount: O valor do boleto, se existir
expirationDate: A data de vencimento do boleto, se existir
barCode: Os 44 dígitos correspondentes ao código de barras desse boleto

 - Deverá ser utilizado apenas o método GET e o path deve ser configurado como
"http://localhost:8080/boleto/xxxxxx".


## Requisitos funcionais

 - [X] Decódificar o código de barras.
    - [X] Validar o código de barras (Boleto inválido ou Boleto inválido). 
 - [X] Extrair a data de válidade do boleto
 - [X] Extrair o valor do boleto
 - [X] Deve ter compatilidade com boletos de titulos bancários e pagamentos de concessionárias.
 - [X] Deve expor uma API Web

## Requisitos N Funcionais

 - [X] Cache dos resultados
 - [X] Documentação de API (swagger)
 - [X] TDD

## Como rodar

 - Ter o Node na versão LTS > 16
 - executar o comando 
   ```cmd
      npm i && npm run build && npm run server
   ```

## Paths

 - Testes
   
   Os testes estão de integração e de unidades localizados na pasta:
   ```
   ./src
   └───📁 __test__
       └───📁 unity
       └───📁 integration
   ```

 - Domínio da aplicação

   As interfaces de entidade e domínio estão distribuidos da seguinte forma
   ```
   ./src
   └───📁 domain
       └───📁 controllers
       └───📁 entities
       └───📁 providers
       └───📁 services
   ```

 - Implementação da regra de negocio

   As sequência de pastas que contém a implementação das regras de negocio
   ```
   ./src
   implementation
       └───📁 controllers
       └───📁 factory
       └───📁 providers
       └───📁 proxy
       └───📁 services
   ```

 - Implementação da interface de exposição WEB

   As sequência de pastas que contém a implementação da interface de exposição WEB
   ```
   ./src
   infra
       └───📁 controllers
       └───📁 routes
       └───📁 server
   ```