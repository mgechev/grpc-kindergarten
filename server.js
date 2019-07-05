const grpc = require('grpc');

const serializeJson = obj => {
  return new Buffer(JSON.stringify(obj));
};
const deserializeJson = buffer => {
  if (buffer === undefined || buffer === null) {
    return buffer;
  }
  return JSON.parse(buffer.toString());
};

const service = {
  add: {
    originalName: 'add',
    path: '/demo.calculator/add',
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
  add(call, cb) {
    console.log(call.request);
    cb(null, call.request);
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
