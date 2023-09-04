 
// Criar uma classe chamada GenericpedidosInputAdapter
export class ProcessarPoliticaInputAdapter {
  // Definir um construtor que recebe o serviço como parâmetro
  constructor(ProcessarPoliticaService) {
    // Atribuir o serviço à propriedade this.GenericpedidosService
    this.processarPoliticaService = ProcessarPoliticaService;
    // Retornar o objeto criado
    return this;
  }

  // Definir um método chamado event_match que recebe o evento como parâmetro
  event_match(event) {
    // Chamar o método get_pedidos com o evento e armazenar o resultado
    let result = this.processarPolitica(event);
    // Retornar o resultado
    return result;
  }

  // Definir um método chamado get_pedidos que recebe o evento como parâmetro
  processarPolitica(event) {
    // Verificar se o evento contém a palavra "get_pedidos" no método ou no caminho, ignorando a caixa alta ou baixa
    if (( event.method + ", " + event.path).search(/processar_politica/i)) {
      // Chamar o método get_pedidos_service do serviço com o evento e retornar o resultado
      return this.processarPoliticaService.processarPoliticaService(event);
    }
  }
 
}
 