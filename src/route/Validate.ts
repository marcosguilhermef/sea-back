import validate from "validate.js";

export class Validate<T>{
    rule: any;
    constructor(rule: any){
        this.rule = rule;
    }

    execute(data: T){
        return validate(data,this.rule);
    }
}