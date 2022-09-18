export class Task {
    constructor(
        public date: string,
        public type: string,
        public title: string,
        public id?: number
    ) {}
}
