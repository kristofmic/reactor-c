import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import path from 'path';
import * as controllers from './controllers';

// Create Express server
const server = express();

// Setup security
server.use(helmet());

// Setup logging
server.use(morgan('dev'));

// Setup JSON parsing
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

// Setup compression
server.use(compression());

// Public assets
server.use('/public', express.static(path.join(__dirname, 'public')));

// View setup
server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'ejs');

// Routes and controllers
server.use('/api/v1/example', controllers.exampleAPIv1);
server.use('/health', controllers.health);
server.use('/error', controllers.error.error);
server.use('/', controllers.main);
server.use(controllers.error.notFound);
server.use(controllers.error.handleError);

export default server;
