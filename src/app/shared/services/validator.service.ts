import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class ValidatorService {

    constructor() { }

    private digit(partial: number[]): number {
        const remainder =
            partial
                .map((value, index) => (partial.length + 1 - index) * value)
                .reduce((accumulator, value) => accumulator + value, 0) % 11;

        return remainder < 2 ? 0 : 11 - remainder;
    }

    public cpf(cpf: any): boolean {
        if (!cpf)
            return false;

        const numberSomething = cpf;

        if (numberSomething.length !== 11) {
            return false;
        }

        const numbers = numberSomething
            .split('')
            .map((char:string): number => parseInt(char, 10));

        if (numbers.every((value:number) => value === numbers[0])) {
            return false;
        }

        if (numbers[9] !== this.digit(numbers.slice(0, 9))) {
            return false;
        }

        if (numbers[10] !== this.digit(numbers.slice(0, 10))) {
            return false;
        }

        return true;
    }

    public cellphone(number:string){
        return number.length == 13
    }

    public cnpj(value:string) : boolean {
        if (!value) return false
      
        const isString = typeof value === 'string'
        const validTypes = isString || Number.isInteger(value) || Array.isArray(value)
      
        if (!validTypes) return false
      
        if (isString) {
          if (value.length > 18) return false
      
          const digitsOnly = /^\d{14}$/.test(value)

          const validFormat = /^\d{2}.\d{3}.\d{3}\/\d{4}-\d{2}$/.test(value)
      
          if (digitsOnly || validFormat) true
          else return false
        }
      
        const match = value.toString().match(/\d/g)
        const numbers = Array.isArray(match) ? match.map(Number) : []
      
        if (numbers.length !== 14) return false
        
        const items = [...new Set(numbers)]
        if (items.length === 1) return false
      
        const calc = (x:any) => {
          const slice = numbers.slice(0, x)
          let factor = x - 7
          let sum = 0
      
          for (let i = x; i >= 1; i--) {
            const n = slice[x - i]
            sum += n * factor--
            if (factor < 2) factor = 9
          }
      
          const result = 11 - (sum % 11)
      
          return result > 9 ? 0 : result
        }
      
        const digits = numbers.slice(12)
        
        const digit0 = calc(12)
        if (digit0 !== digits[0]) return false
      
        const digit1 = calc(13)
        return digit1 === digits[1]
      }


}
