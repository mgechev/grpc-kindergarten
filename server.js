const grpc = require('grpc');
const { readFileSync } = require('fs');

const serializeJson = obj => {
  return new Buffer(JSON.stringify(obj));
};
const deserializeJson = buffer => {
  console.log('##', buffer);
  return buffer;
};

const service = {
  add: {
    originalName: 'add',
    path: '/calculator/add',
    requestStream: false,
    responseStream: false,
    requestSerialize: serializeJson,
    requestDeserialize: deserializeJson,
    responseSerialize: serializeJson,
    responseDeserialize: deserializeJson
  }
};

const server = new grpc.Server();
server.addService(service, {
  add(call) {
    console.log('################### HERE ###################');
    call.write(42);
    call.end();
  }
});

// server.bind(
//   '127.0.0.1:8081',
//   grpc.ServerCredentials.createSsl(readFileSync('./CA_cert.pem'), [
//     {
//       private_key: readFileSync('./server_key.pem'),
//       cert_chain: readFileSync('./server_cert.pem')
//     }
//   ])
// );

server.bind('0.0.0.0:8081', grpc.ServerCredentials.createInsecure());
server.start();
