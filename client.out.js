var grpc = (function (exports) {
  'use strict';

  const getBody = str => {
    const encoder = new TextEncoder();
    const bin = encoder.encode(JSON.stringify(str));
    const n = bin.length.toString(2).padStart(32, '0');
    return new Blob([
      new Uint8Array([
        0,
        parseInt(n.slice(0, 8), 2),
        parseInt(n.slice(8, 16), 2),
        parseInt(n.slice(16, 24), 2),
        parseInt(n.slice(24, 32), 2),
        ...bin
      ])
    ]);
  };

  function grpcJSONRequest(host, serviceName, methodName, requestObject) {
    const service = [serviceName].filter(Boolean).join('.');
    const body = getBody(requestObject);
    return fetch(`${host}/${service}/${methodName}`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'content-type': 'application/grprc+json'
      },
      body
    })
      .then(response => response.text())
      .then(buffer => {
        console.log(buffer);
        return buffer;
      })
      .catch(console.error);
  }

  grpcJSONRequest('http://127.0.0.1:9211', 'calculator', 'add', { message: 'My message' });
  grpcJSONRequest('http://127.0.0.1:9211', 'calculator', 'add', { message: 'Минко' });
  grpcJSONRequest('http://127.0.0.1:9211', 'calculator', 'add', { message: '😬' });

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
