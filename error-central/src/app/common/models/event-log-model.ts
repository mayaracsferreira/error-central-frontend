export class EventLogModel {
    eventID: number;
    level: string;
    title: string;
    collectedBy: string;
    log: string;
    description: string;
    origin: string;
    environment: string;
    archived: true;
    createdDate: Date;
}
