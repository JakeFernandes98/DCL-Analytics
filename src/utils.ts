export class Timer implements ISystem {
    timer: double

    constructor(){
        this.timer = 0
    }

    update(dt: number): void {
        this.timer = this.timer + dt
    }


}