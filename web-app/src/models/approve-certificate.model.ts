/* tslint:disable:no-any */
import {model, property} from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - submitFairTradeData
 * A transaction named approveCertificate
 */
@model({name: 'approveCertificate'})
export class ApproveCertificate {
  constructor(data?: Partial<ApproveCertificate>) {
    if (data != null && typeof data === 'object') {
      Object.assign(this, data);
    }
  }



  /**
   * 
   */
  @property({name: 'regulator', required: true})
  regulator: string;
   /**
   * 
   */
  @property({name: 'regulatorComments'})
  regulatorComments?: string;

  /**
   * The instance identifier for this type
   */
  @property({name: 'applicationId'})
  applicationId?: string;

  /**
   * 
   */
  @property({name: 'timestamp'})
  timestamp?: string;

}

