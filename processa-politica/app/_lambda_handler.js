// Importar o módulo json para manipular dados em formato JSON
 

// Importar os módulos dos adaptadores e do serviço 
import {DmpOutput} from './src/adapter/output/dmp_output.js';
import {PoliticaService} from './src/services/politica_service.js';
import {ProcessarPoliticaInputAdapter} from './src/adapter/input/apigateway_pedidos_input.js';
  

// Declarar serviços
const dmpOutput = new DmpOutput(); 
const politicaService = new PoliticaService(dmpOutput);
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


handler({"path":"processar_politica"})


