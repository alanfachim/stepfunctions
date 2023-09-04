// Definir a URL da api
const url = "https://k1zi9czxpl.execute-api.us-east-1.amazonaws.com";

// Criar uma classe chamada Handler
export class SecretOutput {
  // Definir um construtor que recebe o evento como parâmetro
  constructor(event) {
    // Atribuir o evento à propriedade this.event
    this.event = event;
    // Criar um objeto vazio para armazenar o hashmap
    this.hashmap = {};
  }

  

  // Definir um método chamado postRequest que faz a requisição post para a api usando o hashmap
  async postRequest(hashmap) {
    // Fazer a requisição post usando o fetch e esperar pela resposta
    let response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(hashmap)
    });
    // Converter a resposta em JSON e retornar os dados
    let data = await response.json();
    return data;
  }

  // Definir um método chamado run que executa a lógica da classe
  async run() {
    // Chamar o método createHashmap para criar o hashmap
    this.createHashmap();
    // Chamar o método postRequest para fazer a requisição post e armazenar os dados
    let data = await this.postRequest();
    // Tratar a resposta da api
    console.log(data);
    console.log(this.hashmap);
    // Retornar os dados como a resposta da função lambda
    return data;
  }
}
 