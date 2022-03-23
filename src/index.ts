import jwt, {JwtHeader} from 'jsonwebtoken';
import fs from 'fs';

const generateJWT = async (privKey: string, kid: string, iss: string, expire: number = 7200) => {
  const header: JwtHeader = {
    kid,
    typ: 'JWT',
    alg: 'ES256',
  };

  const uid = '123-dev'

  const payload = {
    uid,
    iss,
    iat: Math.round(Date.now() / 1000),
    exp: Math.round((Date.now() / 1000) + expire),
    ckuid: '_1234567890'
  };

  return jwt.sign(payload, privKey, {header: header});
};

const main = async () => {
  const argv = require('minimist')(process.argv.slice(2));
  const key = fs.readFileSync(argv.key).toString();
  const token = await generateJWT(key, argv.kid, argv.iss,argv.expire ? +argv.expire : undefined);

  console.log(token);
};

main()
    .then(() => {
      // nothing to do
    })
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
