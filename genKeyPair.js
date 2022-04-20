const fs = require('fs');
const crypto = require('crypto');

// console.log(__dirname)

const genKeyPair = () => {
  const keyPair = crypto.generateKeyPairSync('rsa', {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: 'pkcs1',
      format: 'pem'
    },
    privateKeyEncoding: {
      type: 'pkcs1',
      format: 'pem'
    }
  });

  // console.log('keypair >>>', keyPair)

  fs.writeFileSync(__dirname + '/id_rsa_pub.pem', keyPair.publicKey);
  fs.writeFileSync(__dirname + '/id_rsa_priv.pem', keyPair.privateKey)
}

genKeyPair();