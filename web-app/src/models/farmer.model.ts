/* tslint:disable:no-any */
import {model, property} from '@loopback/repository';
import {Address} from './address.model';

/**
 * The model class is generated from OpenAPI schema - Farmer
 * A participant named Farmer
 */
@model({name: 'Farmer'})
export class Farmer {
  constructor(data?: Partial<Farmer>) {
    if (data != null && typeof data === 'object') {
      Object.assign(this, data);
    }
  }

  /**
   * The class identifier for this type
   */
  @property({name: '$class'})
  $class?: string = 'org.ibm.device.Farmer';

  /**
   * The instance identifier for this type
   */
  @property({name: 'farmerId', required: true})
  farmerId: string;

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

