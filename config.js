const { JWT_SECRET = 'JWT_SECRET' } = process.env;
const { BD_ADDRESS = 'mongodb://127.0.0.1/bitfilmsdb' } = process.env;
const { PORT = 3001 } = process.env;

module.exports = {
  JWT_SECRET,
  BD_ADDRESS,
  PORT,
};
