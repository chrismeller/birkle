export interface Timer {
    readonly id: string;
    readonly userId: string;
    readonly description: string;
    readonly startedAt: Date;
    readonly endedAt: Date;
}
