import { Inject } from '@nestjs/common';

export function Logger() {
  return Inject("LoggerProvider");
}