
export const enum CommandType {
    StartRun = "startRun",
    EnterSplit = "enterSplit",
    SkipSplit = "skipSplit",
    ResetRun = "resetRun",
    ClearRun = "clearRun"
}

export interface StartRunCommand {
    command: CommandType.StartRun;
    nonce: string;
}

export interface StartRunResponse {
    reNonce: string;
    error?: string;
}

export interface EnterSplitCommand {
    command: CommandType.EnterSplit;
    nonce: string;
    secondsSinceStart: number;
}

export interface EnterSplitResponse {
    reNonce: string;
    error?: String;
    timeSinceStart: number;
}

export interface SkipSplitCommand {
    command: CommandType.SkipSplit;
    nonce: string;
}

export interface SkipSplitResponse {
    reNonce: string;
    error?: string;
}

export interface ResetRunCommand {
    command: CommandType.ResetRun;
    nonce: string;
}

export interface ResetRunResponse {
    reNonce: string;
    error?: string;
}

export interface ClearRunCommand {
    command: CommandType.ClearRun;
    nonce: string;
}

export interface ClearRunResponse {
    reNonce: string;
    error?: string;
}

export type Command = StartRunCommand | EnterSplitCommand | SkipSplitCommand | ResetRunCommand | ClearRunCommand;
