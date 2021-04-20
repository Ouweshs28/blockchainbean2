/* tslint:disable:no-any */
import {model, property} from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - submitFairTradeData
 * A transaction named submitFairTradeData
 */
@model({name: 'performTest'})
export class PerformTest {
  constructor(data?: Partial<PerformTest>) {
    if (data != null && typeof data === 'object') {
      Object.assign(this, data);
    }
  }

  /**
   * The class identifier for this type
   */
  /**
   * 
   */
  @property({name: 'clinicalLaboratory', required: true})
  clinicalLaboratory: string;

  /**
   * 
   */
  @property({name: 'applicationId', required: true})
  applicationId: string;

  /**
   * 
   */
  @property({name: 'testResults'})
  testResults?: string;

  /**
   * 
   */
  @property({name: 'labComments', required: true})
  labComments: string;

  /**
   * 
   */
  @property({name: 'timestamp'})
  timestamp?: string;

}

