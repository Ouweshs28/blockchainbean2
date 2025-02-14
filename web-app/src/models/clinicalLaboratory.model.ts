/* tslint:disable:no-any */
import {model, property} from '@loopback/repository';
import {Address} from './address.model';

/**
 * The model class is generated from OpenAPI schema - Regulator
 * A participant named Regulator
 */
@model({name: 'clinicalLaboratory'})
export class ClinicalLaboratory {
  constructor(data?: Partial<ClinicalLaboratory>) {
    if (data != null && typeof data === 'object') {
      Object.assign(this, data);
    }
  }

  /**
   * The class identifier for this type
   */
  @property({name: '$class'})
  $class?: string = 'org.ibm.device.clinicalLaboratory';

  /**
   * The instance identifier for this type
   */
  @property({name: 'clinicalLaboratoryId', required: true})
  clinicalLaboratoryId: string;

  /**
   * 
   */
  @property({name: 'organization', required: true})
  organization: string;

  /**
   * A concept named Address
   */
  @property({name: 'address', required: true})
  address: Address;

}

