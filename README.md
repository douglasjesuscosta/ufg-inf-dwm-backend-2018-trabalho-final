# ufg-inf-dwm-backend-2018-trabalho-final
Trabalho final para a disciplina Programação Back-End Avançada no curso de Especialização em Desenvolvimento Web e Mobile - Full Stack da UFG (Universidade Federal de Goiás) em 2018. Elaborado pelos alunos: Douglas de Jesus Costa, Douglas Winston Ribeiro Soares e Lucas de Castro Ribeiro

Esse Microserviço é responsável pelo controle das compras é dos produtos de um supermercado.

<h2>Passos para instalação:</h2>

1º Baixe e instale o interpretador runtime NodeJS com versão igual ou superior a 8.10 e instale o banco de dados MongoDB em sua máquina

link para nodejs: https://nodejs.org/en/
link para mongodb: https://www.mongodb.com/ 

2º Baixe ou clone este repositório localmente

3º Instale todas dependências do projeto utilizando o comando <b>npm install</b> no diretório do projeto

4º Inicie o servidor com a utilização do comando <b>node server.js</b> 

Para a utilização do microserviço é necessário de um app para envio e recebimento de dados via requisições HTTP, como recomendação o postman

link para o postman: https://www.getpostman.com/

<h2>Exemplo de requisições:</h2>

PRODUTOS

1º Para cadastrar um produto

requisição POST 
url: localhost:3000/produtos

Corpo da requisição em JSON
{
	"nome": "<nomeDoProduto>",
	"preco": <preçoDoProduto>
}

2º Para obter todos os produtos cadastrados

requisição GET 
url: localhost:3000/produtos

3º Para obter um produto específico 

requisição GET
url: localhost:3000/produtos/:id

em que :id é o _id do produto

4º Para excluir um produto específico

requisição DELETE
url: localhost:3000/produtos/:id

em que :id é o _id do produto

5º Para atualizar os dados de um produto especíico

requisição PATCH
url: localhost:3000/produtos/:id

em que :id é o _id do produto

Corpo da requisição em JSON
{
	"nome": "<novoNomeDoProduto>",
	"preco": <novoPreçoDoProduto>
}
	
COMPRAS 

1º Para cadastrar uma compra

Para o cadastro da compra é necessário informar, além dos dados da compra, o email e senha do usuário. Esses dados serão enviados para o outro servidor para que seja feita a autentificação e para que o identificador de tal usuário que se encontra apenas no servidor de controle de usuário, seja mandado para a conclusão do cadastro da compra. 

requisição POST

Corpo da requisição:
{
	"idCliente": null,
	"email": "dougls.jesuscosta@gmail.com",
	"senha": "1234567",
	"valor": 150,
	"date": null,
	"products": [
		{
		"name": "Batata",
		"valor": 150,
		"quantidade": 1
		}
	
	]
}
