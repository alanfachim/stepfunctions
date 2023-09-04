
import { CryptoJS } from 'crypto-js';

// Criar uma classe chamada GenericpedidosService
export class PoliticaService {
  // Definir um construtor que recebe os adaptadores de saída como parâmetros
  constructor(sts, secret, redis) {
    // Atribuir os adaptadores às propriedades this.LambdaundefinedOutputAdapter e this.LambdaundefinedOutputAdapter
    this.sts = sts;
    this.secret = secret;
    this.redis = redis;
    // Retornar o objeto criado
    return this;
  }

  gethash(obj) {

  }


  // Define uma função que recebe um objeto e retorna uma hash UUIDv4 baseada no objeto
  uuidv4FromObject(obj) {
    // Serializa o objeto em uma string JSON
    var jsonString = JSON.stringify(obj);
    // Aplica a função hash SHA-1 na string JSON e obtém um valor hexadecimal
    var hexString = CryptoJS.SHA1(jsonString).toString(CryptoJS.enc.Hex);
    // Formata o valor hexadecimal de acordo com o padrão UUIDv4
    var uuid = `${hexString.slice(0, 8)}-${hexString.slice(8, 12)}-4${hexString.slice(13, 16)}-${hexString.slice(16, 18)}${hexString.slice(19, 20)}-${hexString.slice(20, 32)}`;
    return uuid;
  }



  // Definir um método chamado post_dmps_service que recebe o evento como parâmetro
  verificaCacheService(event) {
    // Imprimir o evento no console
    console.log(event);
    const resultado = this.redis.read(this.uuidv4FromObject(event))
    if (resultado) {
      return JSON.parse(resultado)
    } else {
      return { concluido: false }
    }
  }
}
