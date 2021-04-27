/* tslint:disable:no-any */
import { operation, param, requestBody } from '@loopback/rest';
import { ApproveCertificate } from '../models/approve-certificate.model';
import { ResponseMessage } from '../models/response-message.model';
import { BlockChainModule } from '../blockchainClient';

let blockchainClient = new BlockChainModule.BlockchainClient();
/**
 * The controller class is generated from OpenAPI spec with operations tagged
 * by submitFairTradeData
 * A transaction named submitFairTradeData
 */
export class ApproveCertificateController {
  constructor() { }

  /**
   *
   *

   * @param requestBody Model instance data
   * @returns Request was successful
   */
  @operation('post', '/approveCertificate')
  async approveCertificateCreate(@requestBody() requestBody: ApproveCertificate): Promise<ResponseMessage> {

    try {
      console.log('approveCertificate, requestBody: ')


      console.log('request body: ')
      console.log(requestBody)

      let networkObj = await blockchainClient.connectToNetwork();
      console.log('network obj: ')
      console.log(networkObj)
      let dateStr = new Date().toDateString();
      // dateStr = dateStr.toDateString();
      let regData = {
        function: 'approveCertificate',

        regulator: requestBody.regulator,
        applicationId: requestBody.applicationId,
        regulatorComments: requestBody.regulatorComments,
        contract: networkObj.contract
      };

      await blockchainClient.approveCertificate(regData);

      let responseMessage: ResponseMessage = new ResponseMessage({ message: 'added regulatory body approval to Blockchain' });
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

