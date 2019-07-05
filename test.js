const http2 = require('http2');
const { readFileSync } = require('fs');

// // { ':authority': '127.0.0.1:8081',
//   ':method': 'POST',
//   ':path': '/calculator/add',
// //   ':scheme': 'https',
// //   te: 'trailers',
//   'content-type': 'application/grpc',
// //   'content-length': '16',
// //   'accept-encoding': 'gzip',
// //   'user-agent': 'Go-http-client/2.0' }

// // { ':authority': '127.0.0.1:9211',
//   ':path': '/calculator/add',
//   ':method': 'POST',
// //   ':scheme': 'http',
// //   'content-length': '0',
// //   'user-agent':
// //    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36',
// //   'cache-control': 'no-cache',
// //   origin: 'chrome-extension://aicmkgpgakddgnaphhhpliifpcfhicfo',
// //   'x-postman-interceptor-id': '54907109-edea-7469-1da1-e1ba6f8270b4',
// //   'postman-token': 'fd20cce1-a004-4d74-2c69-b957cb82e2d4',
// //   'content-type': 'application/grpc',
// //   accept: '*/*',
// //   'accept-encoding': 'gzip, deflate, br',
// //   'accept-language': 'en-US,en;q=0.9,bg;q=0.8',
// //   'x-forwarded-proto': 'http',
// //   'x-request-id': '97216f9d-133b-4214-aa52-8a0933a47ed4',
// //   'x-envoy-expected-rq-timeout-ms': '15000' }

const options = {
  key: readFileSync('server_key.pem'),
  cert: readFileSync('server_cert.pem')
};

const server = http2.createServer(options);
// const server = http2.createSecureServer(options);

server.on('stream', (stream, headers) => {
  console.log(headers);
  stream.on('error', error => console.error(error));
  stream.on('trailers', (headers, flags) => {
    console.log('Trailers', headers);
  });
  stream.on('headers', (headers, flags) => {
    console.log('Headers', headers);
  });
  stream.on('wantTrailers', () => {
    console.log('Want trailers');
  });
  stream.respond();
  stream.end();
});

server.listen(8081);

// const net = require('net');

// net
//   .createServer(socket => {
//     socket.on('data', function(data) {
//       console.log('Echoing: %s', data.toString());
//       socket.write(data.toString());
//     });
//   })
//   .listen(8081, '0.0.0.0');
