/* tslint:disable:no-any */
import {model, property} from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - requestCertificate
 * A transaction named requestCertificate
 */
@model({name: 'requestCertificate'})
export class RequestCertificate {
  constructor(data?: Partial<RequestCertificate>) {
    if (data != null && typeof data === 'object') {
      Object.assign(this, data);
    }
  }

  /**
   * The instance identifier for this type
   */
  // @property({name: 'batchId', required: true})
  // batchId?: string;

  @property({name: 'applicationId'})
  applicationId?: string;

  /**
   * 
   */
  @property({name: 'timestamp'})
  timestamp?: string;

  /**
   * 
   */
  @property({name: 'farmerName'})
  farmerName?: string;

  /**
   * 
   */
  @property({name: 'farmerId'})
  farmerId?: string;

  /**
   * 
   */
  @property({name: 'address'})
  address?: string;

  /**
   * 
   */
  @property({name: 'cropName'})
  cropName?: string;

  /**
   * 
   */
  @property({name: 'ferlizers'})
  ferlizers?: string;

  /**
   * 
   */
  @property({name: 'farmArea'})
  farmArea?: string;

}


