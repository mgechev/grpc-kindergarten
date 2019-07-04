const grpc = require('grpc');

const serializeJson = obj => new Buffer(JSON.stringify(obj));
const deserializeJson = buffer => JSON.parse(buffer.toString());

const service = {
  add: {
    path: '/Calculator/Add',
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

server.bind('0.0.0.0:8081', grpc.ServerCredentials.createInsecure());
server.start();
