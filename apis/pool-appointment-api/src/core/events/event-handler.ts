import { DomainEvent } from './domain-event';

export interface EventHandler<T extends DomainEvent = DomainEvent> {
  handle(event: T): Promise<void>;
}

export interface EventHandlerConstructor<T extends DomainEvent> {
  new (...args: unknown[]): EventHandler<T>;
}
