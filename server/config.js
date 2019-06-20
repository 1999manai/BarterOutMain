/**
 * @file config.js
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @author Daniel Munoz
 * @author Shawn Chan
 * @author Luis Nova
 * @version 0.0.4
 */

const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://localhost/lets-go-db',
  port: process.env.PORT || 8080,
  key: process.env.JWT_SECRET,
};

export default config;
