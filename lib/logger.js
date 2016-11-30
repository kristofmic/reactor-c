import winston from 'winston';

const logger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      timestamp: () => new Date().toISOString(),
      formatter: options => (
        `${options.timestamp()} (${options.level.toUpperCase()}): ${options.message || ''}`
      )
    })
  ]
});

export default logger;
