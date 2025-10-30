import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { map } from 'rxjs';

export type EmojiType = {
  slug: string;
  character: string;
  unicodeName: string;
  codePoint: string;
  group: string;
  subGroup: string;
};

@Injectable({
  providedIn: 'root',
})
export class Emoji {
  http = inject(HttpClient);
  BASE_URL = environment.EMOJI_API_URL;
  API_TOKEN = environment.EMOJI_API_TOKEN;

  getEmojiCategories(){
    return this.http.get(`${this.BASE_URL}categories?access_key=${this.API_TOKEN}`)
  } 

  getEmojis() {
    return this.http.get<Array<EmojiType>>(`${this.BASE_URL}emojis?access_key=${this.API_TOKEN}`).pipe(map(data => data.reduce((acc:Array<EmojiType>, curr: EmojiType) => {
      acc.push({
        ...curr,
        codePoint: `\\${curr.codePoint.split(' ')[0]}`
      })
      return acc
    },[])))
  }
}
