eko
===

Just another echo server.

### How to run?

1. install both `node` and `npm`
2. `npm install` to install all dependencies (Engine.IO and Express)
3. `node eko` to start the echo server
4. for the client, use latest version of Google Chrome or Firefox which supports websocket (Engine.IO could actually takes care of any other type of `transport` being used)
3. open http://localhost:3000 -- this will open public/index.html
4. if it says "random!", then everything went just fine