export const enum EventType {
    RunStarted = "runStarted",
    SplitEntered = "splitEntered",
    SplitSkipped = "splitSkipped",
    RunReset = "runReset",
    RunCleared = "runCleared"
}

export interface RunStartedEvent {
    event: EventType.RunStarted;
}

export interface SplitEnteredEvent {
    event: EventType.SplitEntered;
    timeSinceStart: number;
}

export interface SplitSkippedEvent {
    event: EventType.SplitSkipped;
}

export interface RunResetEvent {
    event: EventType.RunReset;
}

export interface RunClearedEvent {
    event: EventType.RunCleared;
}
