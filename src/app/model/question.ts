import { Answer } from "./answer";

export class Question {
    id: number = 0;
    question: string ='';
    answers: Answer[] = [new Answer, new Answer, new Answer, new Answer];
    points: number = 0;
    active: boolean = false;
}
