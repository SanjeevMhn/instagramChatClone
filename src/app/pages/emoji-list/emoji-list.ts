import { Component, inject } from '@angular/core';
import { Emoji } from '../../services/emoji/emoji';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-emoji-list',
  imports: [AsyncPipe],
  templateUrl: './emoji-list.html',
  styleUrl: './emoji-list.css'
})
export class EmojiList {
  emojiService = inject(Emoji)
  emojiList = this.emojiService.getEmojis()
}
