import cluster from 'cluster';
import os from 'os';
import logger from './lib/logger';

function clusterProcess(cb) {
  if (cluster.isMaster) {
    const numberOfWorkers = os.cpus().length;

    logger.info(`Master cluster setting up ${numberOfWorkers} workers`);

    for (let i = 0; i < numberOfWorkers; i += 1) {
      cluster.fork();
    }

    cluster.on('online', (worker) => {
      logger.info(`Worker ${worker.process.pid} is online`);
    });

    cluster.on('exit', (worker, code, signal) => {
      logger.warn(`Worker ${worker.process.pid} died with code ${code} and signal ${signal}`);
      logger.warn('Starting a new worker');
      cluster.fork();
    });
  } else {
    cb();
  }
}

export default clusterProcess;
