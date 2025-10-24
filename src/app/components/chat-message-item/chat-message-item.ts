import { Component, HostListener, input } from '@angular/core';
import { ChatMessageItemType } from '../../pages/chat/chat';
import { LucideAngularModule, Reply, Smile } from 'lucide-angular';

@Component({
  selector: 'app-chat-message-item',
  imports: [LucideAngularModule],
  templateUrl: './chat-message-item.html',
  styleUrl: './chat-message-item.css',
})
export class ChatMessageItem {
  message = input<ChatMessageItemType>();
  emoji = Smile;
  reply = Reply;

  baseEmojiList: Array<string> = ['\\1F497', '\\1F602', '\\1F62E', '\\1F622', '\\1F621', '\\1F44D'];
  showBaseEmojiList = false;

  @HostListener('document:keydown', ['$event'])
  handleEscKey(event: KeyboardEvent) {
    if (event.key == 'Escape') {
      event.preventDefault();
      this.showBaseEmojiList = false;
    }
  }

  getBaseEmojis() {
    this.showBaseEmojiList = this.showBaseEmojiList == true ? false : true;
  }

  @HostListener('document:click', ['$event'])
  handleOutsideClick(event: PointerEvent) {
    
    let target = event.target as HTMLElement;
    let parentTarget = target.parentElement?.parentElement;

    console.log(target,parentTarget)

    if (
      !target.classList.contains('base-emoji-item') &&
      !parentTarget?.classList.contains('react')
    ) {
      this.hideBaseEmojiList();
    }
  }

  hideBaseEmojiList() {
    this.showBaseEmojiList = false;
  }
}
