import { Task } from "./task.module";

export class User {
    constructor(
        public email: string,
        public password: string,
        public name: string,
        public tasks: Task[],
        public id?: number
    ) {}
}
