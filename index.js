const express = require('express');
const app = express();
const p = 3301
const auido_proxy_directory = "/mnt/volume_nyc1_01/tts_audio"
const port = process.env.PORT || p;
const cors = require("cors");
const config = require('config');
const winston = require('winston'),expressWinston = require('express-winston');
const bodyParser = require('body-parser');
const corsoption = { origin: "*"}
const { fetch } = require('node-fetch');
var session = require('express-session')
const fileUpload = require('express-fileupload')

app.use(fileUpload())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsoption));
app.use(express.json());
app.options('*', cors(corsoption))

app.use('/uploads/user', express.static(__dirname + '/upload/user'));

app.use(session({
  secret: 'showmethemonkey',
  resave: false,
  saveUninitialized: true
}))

expressWinston.requestWhitelist.push('body');

app.use(expressWinston.logger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File(config.get('logs'))
  ],
}));

app.use(expressWinston.errorLogger({
  transports: [
      new winston.transports.File(config.get('error-logs'))
    ],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
  )
}));

app.use('/audio', express.static(auido_proxy_directory))
const proxyRoutes = require("./routes/proxy")
app.use('/', proxyRoutes);
const uploadRoutes = require("./routes/upload")
app.use('/upload', uploadRoutes);
const resizeRoutes = require("./routes/proxy_size")
app.use('/resize', resizeRoutes);

app.listen(port, () => {
  console.log(`proxy node server is running on port ${port}`);
});
