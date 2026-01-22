import { logger } from '@/utils/logger';

interface MessageParserActionProvider {
  sendToServer: (message: string) => Promise<void>;
}

class MessageParser {
  private actionProvider: MessageParserActionProvider;

  constructor(actionProvider: MessageParserActionProvider) {
    this.actionProvider = actionProvider;
  }

  parse(message: string): void {
    this.actionProvider.sendToServer(message).catch((error) => {
      logger.error('sendToServer failed', error);
    });
  }
}

export default MessageParser;
