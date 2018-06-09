export interface SplitInfo {
    name: string;
    iconUrl: string;
}

export interface Split {
    info: SplitInfo;
    subSplits?: Split[];
}

export const enum SplitQuality {
    Faster = "faster",
    Slower = "slower",
    SessionBest = "sessionBest",
    PersonalBest = "personalBest"
}

export interface Time {
    seconds: number;
    quality: SplitQuality;
}

export interface SplitTime {
    info: SplitInfo;
    time?: Time;
    totalTime?: Time;
    subSplits?: SplitTime[];
}

export interface Category {
    name: string;
}

export interface GameInfo {
    name: string;
}

export interface Game {
    info: GameInfo;
    categories: Category[];
}

export interface SessionTemplate {
    gameInfo: GameInfo;
    category: Category;
    splits: Split[];
}

export const enum RunState {
    Stopped = "stopped",
    Started = "started",
    Reset = "reset",
    Completed = "completed"
}

export interface Run {
    state: RunState;
    totalTime?: Time;
    times: SplitTime[];
}

export interface Session {
    archivedRuns: Run[];
    pastRuns: Run[];
    currentRun?: Run;
    sessionBest?: Run;
    personalBest?: Run;
}
