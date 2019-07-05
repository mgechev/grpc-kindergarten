export function grpcJSONRequest(host, serviceName, methodName, requestObject) {
  const service = [serviceName].filter(Boolean).join('.');
  return fetch(`${host}/${service}/${methodName}`, {
    method: 'POST',
    mode: 'cors',
    headers: new Headers({
      'content-type': 'application/grpc',
      'Accept-Transfer-Encoding': 'trailers'
    }),
    body: JSON.stringify(requestObject)
  })
    .then(response => response.text())
    .then(buffer => {
      console.log(buffer);
      return buffer;
    })
    .catch(console.error);
}

grpcJSONRequest('http://127.0.0.1:9211', 'calculator', 'add', { foo: 42 });

// const grpc = require('grpc');
// const serializeJson = obj => new Buffer(JSON.stringify(obj));
// const deserializeJson = buffer => JSON.parse(buffer.toString());

// const service = {
//   add: {
//     path: '/Calculator/Add',
//     requestStream: false,
//     responseStream: false,
//     requestSerialize: serializeJson,
//     requestDeserialize: deserializeJson,
//     responseSerialize: serializeJson,
//     responseDeserialize: deserializeJson
//   }
// };

// const client = grpc.makeGenericClientConstructor(service, 'Calculator', {});
// console.log(client());
