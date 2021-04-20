/* tslint:disable:no-any */
import { operation, param, requestBody } from '@loopback/rest';
import { ClinicalLaboratory } from '../models/clinicalLaboratory.model';
import { Address } from '../models/address.model';
import { BlockChainModule } from '../blockchainClient';
import { ResponseMessage } from '../models/response-message.model';

let blockchainClient = new BlockChainModule.BlockchainClient();
const clinicalLaboratoryMember = 'clinicalLaboratory';
/**
 * The controller class is generated from OpenAPI spec with operations tagged
 * by Regulator
 * A participant named Regulator
 */
export class ClinicalLaboratoryController {
  constructor() { }

  /**
   *
   *
   * @param requestBody Model instance data
   * @returns Request was successful
   */
  @operation('post', '/ClinicalLaboratory', {
    responses: {
      '200': {
        description: 'ResponseMessage model instance',
        content: { 'application/json': { schema: { 'x-ts-type': ResponseMessage } } },
      },
    },
  })
  async clinicalLaboratoryCreate(@requestBody() requestBody: ClinicalLaboratory): Promise<ResponseMessage> {

    try {
      let networkObj = await blockchainClient.connectToNetwork();
      let dataForAddMember = {
        function: 'addMember',
        id: requestBody.clinicalLaboratoryId,
        organization: requestBody.organization,
        address: `${requestBody.address.street} ${requestBody.address.city} ${requestBody.address.zip} ${requestBody.address.country}`,
        memberType: clinicalLaboratoryMember,
        contract: networkObj.contract
      };

      await blockchainClient.addMember(dataForAddMember);

      let responseMessage: ResponseMessage = new ResponseMessage({ message: 'added CLinical Laboratory to Blockchain' });
      return responseMessage;

    } catch (error) {
      let responseMessage: ResponseMessage = new ResponseMessage({ message: error, statusCode: '400' });
      return responseMessage;
    }
  }
}

