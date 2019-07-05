var grpc = (function (exports) {
  'use strict';

  function grpcJSONRequest(
    host,
    packageName,
    serviceName,
    methodName,
    requestHeaders,
    requestObject
  ) {
    const service = [packageName, serviceName].filter(Boolean).join('.');
    return fetch(`${host}/${service}/${methodName}`, {
      method: 'POST',
      mode: 'cors',
      headers: Object.assign(
        {},
        {
          'content-type': 'application/grpc-web',
          te: 'trailers'
        },
        requestHeaders
      ),
      body: JSON.stringify(requestObject)
    })
      .then(response => response.text())
      .then(buffer => {
        console.log(buffer);
        return buffer;
      })
      .catch(console.error);
  }

  grpcJSONRequest('http://127.0.0.1:9211', '', 'calculator', 'add', {}, 42);

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

  exports.grpcJSONRequest = grpcJSONRequest;

  return exports;

}({}));
