var grpc = (function (exports) {
  'use strict';

  const getBody = str => {
    const encoder = new TextEncoder();
    const bin = encoder.encode(JSON.stringify(str));
    const res = [];
    const twoOnEight = Math.pow(2, 8) - 1;
    const len = bin.length;
    if (len >= Math.pow(2, 32)) {
      throw new Error('Cannot accept message longer than 2^32 - 1');
    }
    for (let i = 0; i < 4; i += 1) {
      res.unshift(((twoOnEight << (i * 8)) & len) >> (i * 8));
    }
    return new Blob([new Uint8Array([0, ...res, ...bin])]);
  };

  function grpcUnary(fetch, host, serviceName, methodName, requestObject) {
    const body = getBody(requestObject);
    return fetch(`${host}/${serviceName}/${methodName}`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'content-type': 'application/grprc'
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

  grpcUnary(fetch, 'http://127.0.0.1:9211', 'calculator', 'add', {
    message: 'My message'
  });
  grpcUnary(fetch, 'http://127.0.0.1:9211', 'calculator', 'add', { message: 'Минко' });
  grpcUnary(fetch, 'http://127.0.0.1:9211', 'calculator', 'add', { message: '😬' });

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

  exports.grpcUnary = grpcUnary;

  return exports;

}({}));
