export interface RunObserver {
    runStarted: () => void;
    splitEntered: (timeSinceStart: number) => void;
}