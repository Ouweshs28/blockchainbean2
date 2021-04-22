
const yaml = require('js-yaml');
const { FileSystemWallet, Gateway } = require('fabric-network');
const fs = require('fs');

const path = require('path');

const configPath = path.join(process.cwd(), './../server/config.json');
const configJSON = fs.readFileSync(configPath, 'utf8');
const config = JSON.parse(configJSON);
var userName = config.appAdmin;
var gatewayDiscovery = config.gatewayDiscovery;
var connection_file = config.connection_file;


// connect to the connection file
const ccpPath = path.join(process.cwd(), './../server/' + connection_file);
const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
const ccp = JSON.parse(ccpJSON);

// A wallet stores a collection of identities for use
const wallet = new FileSystemWallet('./../server/wallet');

export module BlockChainModule {

  export class BlockchainClient {
    async connectToNetwork() {


      const gateway = new Gateway();

      try {

        await gateway.connect(ccp, { wallet, identity: userName, discovery: gatewayDiscovery });

        // Connect to our local fabric
        const network = await gateway.getNetwork('mychannel');
  

        console.log('Connected to mychannel. ');

        // Get the contract we have installed on the peer
        const contract = await network.getContract('blockchainmauri');


        let networkObj = {
          contract: contract,
          network: network
        };

        return networkObj;

      } catch (error) {
        console.log(`Error processing transaction. ${error}`);
        console.log(error.stack);
      } finally {
        console.log('Done connecting to network.');
        // gateway.disconnect();
      }

    }

    async addMember(args: any) {
      //call addMember smart contract function
      //$TODO: dynamically call submitTransaction
      let response = await args.contract.submitTransaction(args.function,
        args.id, args.organization, args.address, args.memberType);
      return response;


    }



    async queryByKey2(contract: any, keyPassed: any) {

      // let str = 'query'
      // let response = await keyPassed.contract.submitTransaction('query', 'arg1', 'arg2');

      let response = await contract.submitTransaction('query', keyPassed);
      console.log('query by key response: ')
      console.log(JSON.parse(response.toString()))
      console.log(response.length)
      if (response.length === 2) {
        response = `${keyPassed} does not exist`;
        return response;
      }
      response = JSON.parse(response.toString());
      return response;

    }

    async queryAll(contract: any) {
      let response = await contract.evaluateTransaction('queryAll');
      console.log(response.toString())
      return response;
    }

    async deleteByKey(contract: any, keyPassed: any) {

      let response = await contract.submitTransaction('deleteKey', keyPassed);
      console.log('delete by key response: ')
      console.log(JSON.parse(response.toString()))
      console.log(response.length)
      if (response.length === 2) {
        response = `${keyPassed} does not exist`;
        return response;
      }
      response = JSON.parse(response.toString());
      return response;

    }

    async queryByKey(keyPassed: any) {

      // let str = 'query'
      // let response = await keyPassed.contract.submitTransaction('query', 'arg1', 'arg2');

      let response = await keyPassed.contract.submitTransaction('query', keyPassed.id);
      console.log('query by key response: ')
      console.log(JSON.parse(response.toString()))
      console.log(response.length)
      if (response.length === 2) {
        response = `${keyPassed.id} does not exist`;
        return response;
      }
      response = JSON.parse(response.toString());
      return response;

    }

    async performTest(args: any) {
      console.log('args in the blockchain client')
      console.log(args)

      let response = await args.contract.submitTransaction(args.function, args.clinicalLaboratory, args.applicationId, args.testResults, args.labComments, args.timestamp);
        return response;

    }

    async approveCertificate(args: any) {
      console.log('args in the blockchain client')
      console.log(args)

      let response = await args.contract.submitTransaction(args.function, args.regulator, args.applicationId, args.regulatorComments, args.timestamp);
      return response;

    }

    async requestCertificate(args: any) {
      console.log('args in the blockchain client,requestCertificate')
      console.log(args)

      let response = await args.contract.submitTransaction(args.function,
        args.farmerName, args.farmerId, args.address,
        args.cropName,args.ferlizers, args.farmArea, args.timestamp
      );

      return response;

    }

    
  }
  
}