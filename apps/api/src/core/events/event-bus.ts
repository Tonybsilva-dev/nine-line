import { DomainEvent } from './domain-event';
import { EventHandler, EventHandlerConstructor } from './event-handler';
import { logger } from '../../config/logger';

export class EventBus {
  private handlers: Map<string, EventHandler[]>;

  constructor() {
    this.handlers = new Map();
  }

  /**
   * Registra um handler para um tipo de evento
   */
  register<T extends DomainEvent>(
    eventName: string,
    handler: EventHandler<T>,
  ): void {
    if (!this.handlers.has(eventName)) {
      this.handlers.set(eventName, []);
    }

    this.handlers.get(eventName)!.push(handler);

    logger.info({
      type: 'event_handler_registered',
      eventName,
      handlerName: handler.constructor.name,
      totalHandlers: this.handlers.get(eventName)!.length,
    });
  }

  /**
   * Registra um handler usando a classe construtora
   */
  registerHandler<T extends DomainEvent>(
    eventName: string,
    handlerConstructor: EventHandlerConstructor<T>,
  ): void {
    const handler = new handlerConstructor();
    this.register(eventName, handler);
  }

  /**
   * Publica um evento para todos os handlers registrados
   */
  async publish(event: DomainEvent): Promise<void> {
    const eventName = event.eventName;
    const handlers = this.handlers.get(eventName) || [];

    logger.info({
      type: 'domain_event_published',
      eventName,
      eventId: event.eventId,
      aggregateId: event.aggregateId,
      handlersCount: handlers.length,
      registeredHandlers: Array.from(this.handlers.keys()),
    });

    const promises = handlers.map(async (handler) => {
      try {
        await handler.handle(event);
        logger.debug({
          type: 'domain_event_handled',
          eventName,
          eventId: event.eventId,
          handlerName: handler.constructor.name,
        });
      } catch (error) {
        logger.error({
          type: 'domain_event_handler_error',
          eventName,
          eventId: event.eventId,
          handlerName: handler.constructor.name,
          error: error instanceof Error ? error.message : 'Unknown error',
        });
        throw error;
      }
    });

    await Promise.all(promises);
  }

  /**
   * Publica múltiplos eventos
   */
  async publishAll(events: DomainEvent[]): Promise<void> {
    for (const event of events) {
      await this.publish(event);
    }
  }

  /**
   * Remove todos os handlers
   */
  clear(): void {
    this.handlers.clear();
  }

  /**
   * Obtém o número de handlers para um evento
   */
  getHandlerCount(eventName: string): number {
    return this.handlers.get(eventName)?.length || 0;
  }
}
