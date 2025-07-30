export abstract class DomainEvent {
  public readonly occurredAt: Date;
  public readonly eventId: string;

  constructor() {
    this.occurredAt = new Date();
    this.eventId = this.generateEventId();
  }

  abstract get eventName(): string;

  abstract get aggregateId(): string;

  private generateEventId(): string {
    return `${this.eventName}-${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
  }

  public toJSON() {
    return {
      eventId: this.eventId,
      eventName: this.eventName,
      aggregateId: this.aggregateId,
      occurredAt: this.occurredAt.toISOString(),
    };
  }
}
