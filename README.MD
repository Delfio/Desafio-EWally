# Desafio prático WAlly

Este repositório contém o exame prático WAlly.

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

 - [] Decódificar o código de barras.
    - [] Validar o código de barras (Boleto inválido ou Boleto inválido). 
 - [] Extrair a data de válidade do boleto
 - [] Extrair o valor do boleto
 - [] Deve ter compatilidade com boletos de titulos bancários e pagamentos de concessionárias.
 - [] Deve expor uma API Web

## Requisitos N Funcionais

 - [] Cache dos resultados
 - [] Documentação de API (swagger)
 - [] TDD