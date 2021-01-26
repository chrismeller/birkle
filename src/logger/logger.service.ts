import { Injectable, Logger, Scope } from '@nestjs/common';
import { LoggerService as NestLoggerService } from '@nestjs/common';
import { TransportStreamOptions } from 'winston-transport';
import * as winston from 'winston';
import { ConfigService } from '../config/config.service';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService implements NestLoggerService {
  private readonly winston: winston.Logger;

  constructor(private readonly configService: ConfigService) {
    this.winston = winston.createLogger();

    if (this.configService.getBoolean('logging.console.enabled') === true) {
      this.winston.add(
        new winston.transports.Console({
          silent: false,
          level: this.configService.get('logging.console.level'),
          format: winston.format.combine(
            winston.format.cli(),
            winston.format.timestamp(),
            winston.format.printf(({level, message, label, timestamp}) => {
              return `${timestamp} [${label}] ${level}: ${message}`;
            }),
          )
        })
      );
    }
  }

  warn(message: any, context?: string) {
    this.winston.warn(message);
  }
  log(message: any, context?: string) {
    this.winston.log('info', message);
  }
  error(message: any, trace?: string, context?: string) {
    this.winston.error(message);
  }
  debug?(message: any, context?: string) {
    this.winston.debug(message);
  }
  verbose?(message: any, context?: string) {
    this.winston.verbose(message);
  }
}