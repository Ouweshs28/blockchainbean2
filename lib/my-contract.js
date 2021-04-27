/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class MyContract extends Contract {

  /**
   * 
   * addMember 
   * 
   * When a member to the blockchain - can be either farmer, MACB or FAREI.
   * @param id - the unique id to identify the member
   * @param organization - what organization is the member part of
   * @param address - address of org
   * @param memberType - can be farmer, MACB or FAREI
   */

  async addMember(ctx, id, organization, address, memberType) {
    console.info('addMember invoked');

    //create object to hold details of our new member
  
    let newMember = {};

    newMember.id = id;
    newMember.organization = organization;
    newMember.address = address;
    newMember.memberType = memberType;



    await ctx.stub.putState(id, Buffer.from(JSON.stringify(newMember)));
    console.info('updated ledger with key: ' + id + 'and value: ');
    console.info(JSON.stringify(newMember));

    return newMember;

  }

  async init(ctx) {
    console.info('init invoked');

  }
  /**
   * 
   * requestCertificate 
   * 
   * When a farmer request for a certificate, the latter is addded to the blockchain.
   * This farmer asset on the blockchain.
   * @param certificateState - state of coffee (READY_FOR_DISTRIBUTION, 
   * REGULATION_TEST_PASSED, IMPORTED, READY_FOR_SALE)
   * @param farmerId - the Id of the farmer who will be associated with this batch
   */

  async requestCertificate(ctx, farmerName, farmerId, address, cropName, ferlizers, farmArea, timestamp) {
    console.info('requestCertificate invoked');

    //TODO: 
    //do make sure the farmer exists in the blockchain
    let farmer = {};
    // generate random applicationID from Math.random function
    let applicationID = Math.random().toString(36).substring(3);
    farmer.farmerName = farmerName;
    farmer.farmerId = farmerId;
    farmer.certificateState = 'PENDING_QUALITY_CHECK';
    farmer.address = address;
    farmer.cropName=cropName;
    farmer.ferlizers=ferlizers;
    farmer.farmArea=farmArea;
    farmer.applicationID = applicationID;
    farmer.timestamp = timestamp;


    await ctx.stub.putState(applicationID, Buffer.from(JSON.stringify(farmer)));
    console.info('updated ledger with key: ' + applicationID + 'and value: ');
    console.info(JSON.stringify(farmer));
    return farmer;
  }


  /**
   * 
   * performTest
   * 
   * A transaction which adds fair trade data about our farmer batch.
   * @param clinicalLaboratory
   * @param applicationID - the batch of farmer which is produced according to fair-trade standards
   * @param testResults 
   * 
   */

  // args.function,
  // args.reportName, args.organizationDescription, args.reportYear, args.fairtradePremiumInvested,
  // args.invementTitle1, args.investmentAmount2 ,args.investmentTitle2, args.investmentAmount3,
  // args.investmentTitle3, args.batchId, args.applicationId, args.timestamp  st


  async performTest(ctx, clinicalLaboratory, applicationID, testResults, labComments, timestamp) {

    //get batch identified by Id from the ledger
    let farmerAsBytes = await ctx.stub.getState(applicationID);
    if (!farmerAsBytes || farmerAsBytes.length === 0) {
      return new Error(`${applicationID} farmer does not exist`);
    }
    let sampleCheck = JSON.parse(farmerAsBytes);


    //update our batch of farmer with the shipping details and a owner (the trader)
    // let farmer = {};


    sampleCheck.clinicalLaboratory = clinicalLaboratory;
    sampleCheck.testResults = testResults;
    sampleCheck.labComments = labComments;

    if(testResults == 'PASS'){
      sampleCheck.certificateState = 'PASSED_QUALITY_CHECK';
    }
    else{
      sampleCheck.certificateState = 'FAILED_QUALITY_CHECK';
    }
    
    sampleCheck.timestamp = timestamp;
    console.log('applicationID: ')
    console.info(applicationID)

    //update the ledger with the new shipping + owner details
    await ctx.stub.putState(applicationID, Buffer.from(JSON.stringify(sampleCheck)));
    console.info('updated ledger with key: ' + applicationID + 'and value: ');
    console.info(JSON.stringify(sampleCheck));
    return sampleCheck;
  }

  
  async approveCertificate(ctx, regulator, applicationId, regulatorComments, timestamp) {

    //get batch identified bby batchId from the ledger
    let applicationAsBytesRegulatory = await ctx.stub.getState(applicationId);
    if (!applicationAsBytesRegulatory || applicationAsBytesRegulatory.length === 0) {
      return new Error(`${applicationId} application does not exist`);
    }


    let certificateApproval = JSON.parse(applicationAsBytesRegulatory);

    if(certificateApproval.certificateState == 'PASSED_QUALITY_CHECK'){
      certificateApproval.certificateState = 'READY_FOR_DISTRIBUTION'
      certificateApproval.certificateID=Math.random().toString(36).substring(3);
    }
  
    certificateApproval.regulator = regulator;
    certificateApproval.regulatorComments = regulatorComments;
    certificateApproval.timestamp = timestamp;
    console.log('applicationId: ')
    console.info(applicationId)

    //update the ledger with the new shipping + owner details
    await ctx.stub.putState(applicationId, Buffer.from(JSON.stringify(certificateApproval)));
    console.info('updated ledger with key: ' + applicationId + 'and value: ');
    console.info(JSON.stringify(certificateApproval));
    return certificateApproval;
  }

  async query(ctx, key) {
    console.info('query by key ' + key);
    let returnAsBytes = await ctx.stub.getState(key);
    console.info(returnAsBytes)
    if (!returnAsBytes || returnAsBytes.length === 0) {
      return new Error(`${key} does not exist`);
    }
    let result = JSON.parse(returnAsBytes);
    console.info('result of getState: ');
    console.info(result);
    return JSON.stringify(result);
  }

  async deleteKey(ctx, key) {
    console.info('delete key: ' + key);
    let returnAsBytes = await ctx.stub.deleteState(key);
    console.info(returnAsBytes)
    if (!returnAsBytes || returnAsBytes.length === 0) {
      console.info('no bytes returned')
      return new Error(`successfully deleted key: ${key}`);
    }
    // let result = JSON.parse(returnAsBytes);
    // console.info('result of deleteState: ');
    // console.info(result);
    return JSON.stringify(returnAsBytes);
  }

  async queryAll(ctx) {

    let queryString = {
      "selector": {}
    }

    let queryResults = await this.queryWithQueryString(ctx, JSON.stringify(queryString));
    return queryResults;

  }

  async queryWithQueryString(ctx, queryString) {

    console.log("query String");
    console.log(JSON.stringify(queryString));

    let resultsIterator = await ctx.stub.getQueryResult(queryString);

    let allResults = [];

    while (true) {
      let res = await resultsIterator.next();

      if (res.value && res.value.value.toString()) {
        let jsonRes = {};

        console.log(res.value.value.toString('utf8'));

        jsonRes.Key = res.value.key;

        try {
          jsonRes.Record = JSON.parse(res.value.value.toString('utf8'));
        } catch (err) {
          console.log(err);
          jsonRes.Record = res.value.value.toString('utf8');
        }

        allResults.push(jsonRes);
      }
      if (res.done) {
        console.log('end of data');
        await resultsIterator.close();
        console.info(allResults);
        console.log(JSON.stringify(allResults));
        return JSON.stringify(allResults);
      }
    }
  }

}

module.exports = MyContract;
