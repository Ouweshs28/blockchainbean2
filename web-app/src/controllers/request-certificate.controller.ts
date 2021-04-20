/* tslint:disable:no-any */
import { operation, param, requestBody } from '@loopback/rest';
import { RequestCertificate } from '../models/request-certificate.model'
import { ResponseMessage } from '../models/response-message.model';
import { BlockChainModule } from '../blockchainClient';

let blockchainClient = new BlockChainModule.BlockchainClient();
/**
 * The controller class is generated from OpenAPI spec with operations tagged
 * by requestCertificate 
 * A transaction named requestCertificate 
 */
export class RequestCertificateController {
  constructor() { }

  /**
   *
   *

   * @param requestBody Model instance data
   * @returns Request was successful
   */
  @operation('post', '/requestCertificate ', {
    responses: {
      '200': {
        description: 'ResponseMessage model instance',
        content: { 'application/json': { schema: { 'x-ts-type': ResponseMessage } } },
      },
    },
  })
  async requestCertificateCreate(@requestBody() requestBody: RequestCertificate): Promise<ResponseMessage> {

    try {
      let networkObj = await blockchainClient.connectToNetwork();

      let dateStr = new Date().toDateString();
      let dataForRequestCertificate = {
        function: 'requestCertificate',
        farmerName: requestBody.farmerName,
        farmerId: requestBody.farmerId,
        address:requestBody.address,
        cropName:requestBody.cropName,
        ferlizers:requestBody.ferlizers,
        timestamp: dateStr,
        contract: networkObj.contract
      };

      await blockchainClient.requestCertificate(dataForRequestCertificate);

      let responseMessage: ResponseMessage = new ResponseMessage({ message: 'added farmer request to Blockchain' });
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
  // @operation('get', '/requestCertificate ')
  // async requestCertificate Find(@param({ name: 'filter', in: 'query' }) filter: string): Promise<requestCertificate []> {
  //   throw new Error('Not implemented');
  // }

  /**
   *
   *

   * @param id Model id
   * @param filter Filter defining fields and include - must be a JSON-encoded string ({"something":"value"})
   * @returns Request was successful
   */
  // @operation('get', '/requestCertificate /{id}')
  // async requestCertificate FindById(@param({ name: 'id', in: 'path' }) id: string, @param({ name: 'filter', in: 'query' }) filter: string): Promise<AddCoffee> {
  //   throw new Error('Not implemented');
  // }

}

