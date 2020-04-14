const user = require('./data/user')

const delay = require('mocker-api/utils/delay');
const noProxy = process.env.NODE_ENV === 'production' ? true : false;

const proxy = {
  ...user
}

module.exports = (noProxy ? {} : delay(proxy, 2000));

