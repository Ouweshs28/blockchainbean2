/* tslint:disable:no-any */
import {model, property} from '@loopback/repository';
import {Address} from './address.model';

/**
 * The model class is generated from OpenAPI schema - Laboratory
 * A participant named Laboratory
 */
@model({name: 'Laboratory'})
export class Laboratory {
  constructor(data?: Partial<Laboratory>) {
    if (data != null && typeof data === 'object') {
      Object.assign(this, data);
    }
  }

  /**
   * The class identifier for this type
   */
  @property({name: '$class'})
  $class?: string = 'org.ibm.device.Laboratory';

  /**
   * The instance identifier for this type
   */
  @property({name: 'laboratoryId', required: true})
  laboratoryId: string;

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

