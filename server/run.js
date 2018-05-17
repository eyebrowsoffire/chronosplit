
class Run {
    constructor(template) {
        this.template = template;
        this.splitTimes = this.template.splits.map(function (split){
            var splitTime;
            splitTime.info = split.info;
            splitTime.time = null;
            splittime.totalTime = null;
        });
        this.currentSplit = null;
    }

    
}
