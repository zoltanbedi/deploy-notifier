export = index;
declare class index {
  static createChannel(): any;
  constructor({ source, target, logger = console }: any);
  source: any;
  target: any;
  logger: any;
  onerror(err: any): void;
  onmessage(msg: any): void;
  onopen(): void;
  start(): any;
}
