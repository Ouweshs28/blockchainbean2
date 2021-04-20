/* tslint:disable:no-any */
import { operation, param, requestBody } from '@loopback/rest';
import { Laboratory } from '../models/laboratory.model';
import { Address } from '../models/address.model';
import { BlockChainModule } from '../blockchainClient';
import { ResponseMessage } from '../models/response-message.model';

let blockchainClient = new BlockChainModule.BlockchainClient();
/**
 * The controller class is generated from OpenAPI spec with operations tagged
 * by Laboratory
 * A participant named Laboratory
 */
export class LaboratoryController {
  constructor() { }

  /**
   *
   *

   * @param requestBody Model instance data
   * @returns Request was successful
   */
  @operation('post', '/Laboratory', {
    responses: {
      '200': {
        description: 'ResponseMessage model instance',
        content: { 'application/json': { schema: { 'x-ts-type': ResponseMessage } } },
      },
    },
  })
  async laboratoryCreate(@requestBody() requestBody: Laboratory): Promise<ResponseMessage> {
    try {
      let networkObj = await blockchainClient.connectToNetwork();
      console.log('request body: ')
      console.log(requestBody)
      let dataForAddMember = {
        function: 'addMember',
        id: requestBody.laboratoryId,
        organization: requestBody.organization,
        address: `${requestBody.address.street} ${requestBody.address.city} ${requestBody.address.zip} ${requestBody.address.country}`,
        memberType: 'laboratory',
        contract: networkObj.contract
      };

      await blockchainClient.addMember(dataForAddMember);

      let responseMessage: ResponseMessage = new ResponseMessage({ message: 'added Laboratory to Blockchain' });
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
  // @operation('get', '/Laboratory')
  // async growerFind(@param({ name: 'filter', in: 'query' }) filter: string): Promise<Laboratory[]> {
  //   throw new Error('Not implemented');
  // }

  /**
   *
   *

   * @param id Model id
   * @returns Request was successful
   */
  // @operation('head', '/Grower/{id}')
  // async growerExists(@param({ name: 'id', in: 'path' }) id: string): Promise<{
  //   exists?: boolean;
  // }> {
  //   throw new Error('Not implemented');
  // }

  /**
   *
   *

   * @param id Model id
   * @param filter Filter defining fields and include - must be a JSON-encoded string ({"something":"value"})
   * @returns Request was successful
   */
  // @operation('get', '/Grower/{id}')
  // async growerFindById(@param({ name: 'id', in: 'path' }) id: string, @param({ name: 'filter', in: 'query' }) filter: string): Promise<any> {
  //  let networkObj = await blockchainClient.connectToNetwork();
  //   let dataForQuery = {
  //     function: 'query',
  //     id: id,
  //     contract: networkObj.contract,
  //     network: networkObj.network
  //   };

  //   console.log('before blockchainClient.queryByKey')
  //   let result = await blockchainClient.queryByKey(dataForQuery);
  //   console.log(`lookup by key ${id}`);
  //   console.log('result after calling client.queryByKey: ')
  //   console.log(result)
  //   if (result.id) {
  //     var rez = JSON.parse(result.toString());
  //     console.log(rez)
  //     let address = new Address({ city: rez.address, country: rez.address, street: rez.address });
  //     let grower = new Grower({ growerId: rez.id, organization: rez.organization, address: address });
  //     return grower;
  //   }
  //   return result;
  // }

  /**
   *
   *

   * @param requestBody Model instance data
   * @param id Model id
   * @returns Request was successful
   */
  // @operation('put', '/Grower/{id}')
  // async growerReplaceById(@requestBody() requestBody: Grower, @param({ name: 'id', in: 'path' }) id: string): Promise<Grower> {
  //   throw new Error('Not implemented');
  // }

  /**
   *
   *

   * @param id Model id
   * @returns Request was successful
   */
  // @operation('delete', '/Grower/{id}')
  // async growerDeleteById(@param({ name: 'id', in: 'path' }) id: string): Promise<{

  // }> {
  //   throw new Error('Not implemented');
  // }

}

