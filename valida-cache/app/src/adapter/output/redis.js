// Importar o módulo redis 
import {redis} from 'redis';

// Criar uma classe para encapsular as operações com o redis
export class RedisOutput {
  // Construtor que recebe as opções de conexão
  constructor(options) {
    // Criar um cliente redis usando as opções
    this.client = redis.createClient(options);
    // Tratar os eventos de erro e pronto
    this.client.on('error', (err) => console.error(err));
    this.client.on('ready', () => console.log('Conectado ao Redis'));
  }

  // Método para ler um valor de uma chave
  read(key) {
    // Retornar uma promessa que resolve com o valor ou rejeita com o erro
    return new Promise((resolve, reject) => {
      // Usar o método get do cliente para obter o valor da chave
      this.client.get(key, (err, value) => {
        if (err) {
          // Se houver erro, rejeitar a promessa
          reject(err);
        } else {
          // Se não houver erro, resolver a promessa com o valor
          resolve(value);
        }
      });
    });
  }

  // Método para gravar um valor em uma chave
  write(key, value) {
    // Retornar uma promessa que resolve com 'OK' ou rejeita com o erro
    return new Promise((resolve, reject) => {
      // Usar o método set do cliente para gravar o valor na chave
      this.client.set(key, value, (err, reply) => {
        if (err) {
          // Se houver erro, rejeitar a promessa
          reject(err);
        } else {
          // Se não houver erro, resolver a promessa com a resposta
          resolve(reply);
        }
      });
    });
  }

  // Método para fechar a conexão com o redis
  close() {
    // Usar o método quit do cliente para encerrar a conexão
    this.client.quit();
  }
}
