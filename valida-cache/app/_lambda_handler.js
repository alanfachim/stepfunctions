// Importar o módulo json para manipular dados em formato JSON


// Importar os módulos dos adaptadores e do serviço 
import { RedisOutput } from './src/adapter/output/redis.js';
import { SecretOutput } from './src/adapter/output/secret.js';
import { StsOutput } from './src/adapter/output/sts.js';
import { PoliticaService } from './src/services/verifica_cache_service.js';
import { ProcessarPoliticaInputAdapter } from './src/adapter/input/apigateway_pedidos_input.js';


// Declarar serviços
const redis = new RedisOutput();
const secret = new SecretOutput();
const sts = new StsOutput();
const politicaService = new PoliticaService(sts, secret, redis);
const processarPoliticaInputAdapter = new ProcessarPoliticaInputAdapter(politicaService);

// Definir a função lambda_handler que recebe o evento e o contexto como parâmetros
export const handler = async (event, context) => {
  // Chamar o método event_match do adaptador de entrada e armazenar o resultado
  let result = processarPoliticaInputAdapter.event_match(event);
  // Verificar se o resultado é verdadeiro
  if (result) {
    // Retornar um objeto com statusCode 200 e body com o resultado em formato JSON
    return {
      statusCode: 200,
      body: JSON.stringify(result)
    };
  }
  // Retornar um objeto com statusCode 200 e body com uma mensagem em formato JSON
  return {
    statusCode: 200,
    body: JSON.stringify("evento não identificado")
  };
};


handler({ "path": "processar_politica" })


