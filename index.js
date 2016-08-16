
var PeerRelay = require('peer-relay')
var DHT = require('bittorrent-dht')
var Debug = require('debug')

Debug.enable('peer-relay:*,bittorrent-dht')

module.exports.start = function (opts) {
  /* The PeerRelay socket relays messages through it's immediately connected peers to allow
   * sending messages to peers without needing a direct connection. The socket's interface
   * is similar to that of dgram's Socket. The main difference is that hosts are not
   * identified by their IP address; instead each peer/host is identified by a randomly
   * generated 160-bit hex ID.
   */
  var socket = new PeerRelay.Socket(opts)

  var dht = new DHT({
    socket: socket, // All communication will go through the PeerRelay socket
    nodeId: socket.peer.id,
    bootstrap: false, // The built-in bootstrap method is not compatible with PeerRelay's IDs
    isIP: function () { return true } // Prevents DNS resolves on PeerRelay IDs
  })

  dht.listen()

  // Bootstrap manually. Any peer that PeerRelay connects to, add it to the dht
  socket.peer.on('peer', function (id) {
    dht.addNode({
      host: id.toString('hex'),
      port: 0,
      id: id
    })
  })

  return dht
}
