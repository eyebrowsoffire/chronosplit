// @ts-check

import * as Models from "chronosplit-core/Models";
import { RunObserver } from "chronosplit-core/RunObserver";

export class RunManager {
    private template: Models.SessionTemplate;
    private currentRun?: Models.Run;
    private currentSplit?: Models.Split;
    private observers: Set<RunObserver>;

    constructor(template: Models.SessionTemplate) {
        this.template = template;
        this.currentRun = this.createFreshRunFromTemplate(this.template);
        this.currentSplit = undefined;
        this.observers = new Set();
    }

    private createFreshRunFromTemplate(template: Models.SessionTemplate): Models.Run {
        return {
            "state" : Models.RunState.Stopped,
            "times" : template.splits.map(this.createSplitTime)
        };
    }

    private createSplitTime(split: Models.Split): Models.SplitTime  {
        return {
            "info": split.info,
            "subSplits": (split.subSplits) ? split.subSplits.map(this.createSplitTime) : undefined
        };
    }

    public addObserver(observer: RunObserver) {
        this.observers.add(observer);
    }

    public removeObserver(observer: RunObserver) {
        this.observers.delete(observer);
    }

    public startRun() {
        if (this.currentRun.state != Models.RunState.Started) {
            return "Run not in the stopped state.";
        }

        this.currentRun.state = Models.RunState.Started;

        this.observers.forEach((observer) => {
            observer.runStarted();
        });
    }

    public enterSplit(timeSinceStart: number) {

    }
}
