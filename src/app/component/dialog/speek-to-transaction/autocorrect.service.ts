import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutocorrectService {

  WORDS: any =   {
    'IP':'I pay',
    'paint': 'spent',
    'Paint': 'Spent'
  }
  constructor() { }

  autoCorrect(text: string) {
    const textArr = text.split(" ");
    return textArr.map((t:any)=> this.WORDS[t]? this.WORDS[t]: t ).join(" ");
  }
}
