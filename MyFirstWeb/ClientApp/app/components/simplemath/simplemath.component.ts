import { Component } from '@angular/core';

interface ISimpleMath {
    number1: number;
    number2: number;

    calculate(operator: string): number;
}

class SimpleMath implements ISimpleMath {
    number1: number;
    number2: number;

    calculate(operator: string): number {
        var num1 = Number(this.number1);
        var num2 = Number(this.number2);

        var result: number = 0;
        switch (operator) {
            case "+":
                result = num1 + num2;
                break;
            case "-":
                result = num1 - num2;
                break;
            case "*":
                result = num1 * num2;
                break;
            case "/":
                result = num1 / num2;
                break;
        }

        return result;
    }
}

@Component({
    selector: 'simple-math',
    templateUrl: './simplemath.component.html'
})
export class SimpleMathComponent {
    public operators: string[];
    public operator: string = "+";
    public result: number;
    private simpleMath: ISimpleMath = new SimpleMath();

    constructor() {
        this.operators = ["+", "-", "*", "/"];
    }

    public calculate() {
        this.result = this.simpleMath.calculate(this.operator);
    }
}
