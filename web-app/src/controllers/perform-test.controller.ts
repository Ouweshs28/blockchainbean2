/* tslint:disable:no-any */
import { operation, param, requestBody } from '@loopback/rest';
import { PerformTest } from '../models/perform-test.model';
import { ResponseMessage } from '../models/response-message.model';
import { BlockChainModule } from '../blockchainClient';

let blockchainClient = new BlockChainModule.BlockchainClient();
/**
 * The controller class is generated from OpenAPI spec with operations tagged
 * by submitFairTradeData
 * A transaction named submitFairTradeData
 */
export class PerformTestController {
  constructor() { }

  /**
   *
   *

   * @param requestBody Model instance data
   * @returns Request was successful
   */
  @operation('post', '/performTest')
  async performTestCreate(@requestBody() requestBody: PerformTest): Promise<ResponseMessage> {

    try {
      console.log('performTest, requestBody: ')


      console.log('request body: ')
      console.log(requestBody)

      let networkObj = await blockchainClient.connectToNetwork();
      console.log('newtork obj: ')
      console.log(networkObj)
      let dateStr = new Date().toDateString();
      // dateStr = dateStr.toDateString();
      let labData = {
        function: 'performTest',
        clinicalLaboratory: requestBody.clinicalLaboratory,
        applicationId: requestBody.applicationId,
        testResults: requestBody.testResults,
        labComments: requestBody.labComments,
        timestamp: dateStr,
        contract: networkObj.contract
      };

      await blockchainClient.performTest(labData);

      let responseMessage: ResponseMessage = new ResponseMessage({ message: 'added performTest to Blockchain' });
      return responseMessage;

    } catch (error) {
      let responseMessage: ResponseMessage = new ResponseMessage({ message: error, statusCode: '400' });
      return responseMessage;
    }
  }

  /**
   *
   *

   * @param filter Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({"something":"value"})
   * @returns Request was successful
   */
  // @operation('get', '/submitFairTradeData')
  // async submitFairTradeDataFind(@param({ name: 'filter', in: 'query' }) filter: string): Promise<SubmitFairTradeData[]> {
  //   throw new Error('Not implemented');
  // }

  /**
   *
   *

   * @param id Model id
   * @param filter Filter defining fields and include - must be a JSON-encoded string ({"something":"value"})
   * @returns Request was successful
   */
  // @operation('get', '/submitFairTradeData/{id}')
  // async submitFairTradeDataFindById(@param({ name: 'id', in: 'path' }) id: string, @param({ name: 'filter', in: 'query' }) filter: string): Promise<SubmitFairTradeData> {
  //   throw new Error('Not implemented');
  // }

}

