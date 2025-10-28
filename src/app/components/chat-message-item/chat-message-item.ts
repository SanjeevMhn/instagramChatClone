import { Component, EventEmitter, HostListener, input, Output, output } from '@angular/core';
import { ChatMessageItemType } from '../../pages/chat/chat';
import {
  Ellipsis,
  EllipsisVertical,
  LucideAngularModule,
  Plus,
  Reply,
  Smile,
} from 'lucide-angular';

@Component({
  selector: 'app-chat-message-item',
  imports: [LucideAngularModule],
  templateUrl: './chat-message-item.html',
  styleUrl: './chat-message-item.css',
})
export class ChatMessageItem {
  message = input<ChatMessageItemType>();
  emojiAction = output<ChatMessageItemType>();
  replyAction = output<ChatMessageItemType>();
  editAction = output<ChatMessageItemType>()

  emoji = Smile;
  reply = Reply;
  plus = Plus;
  dots = EllipsisVertical;

  baseEmojiList: Array<string> = ['\\1F497', '\\1F602', '\\1F62E', '\\1F622', '\\1F621', '\\1F44D'];
  showBaseEmojiList = false;
  showMoreOpts = false;

  @HostListener('document:keydown', ['$event'])
  handleEscKey(event: KeyboardEvent) {
    if (event.key == 'Escape') {
      event.preventDefault();
      this.showBaseEmojiList = false;
      this.handleHideMoreOpts();
    }
  }

  getBaseEmojis() {
    this.showBaseEmojiList = this.showBaseEmojiList == true ? false : true;
  }

  @HostListener('document:click', ['$event'])
  handleOutsideClick(event: PointerEvent) {
    requestAnimationFrame(() => {
      let target = event.target as HTMLElement;
      let parentTarget = target.parentElement?.parentElement;

      if (
        !target.classList.contains('more-opt-item') &&
        !parentTarget?.classList.contains('more-opt-btn')
      ) {
        this.handleHideMoreOpts();
      }
      if (
        !target.classList.contains('base-emoji-item') &&
        !parentTarget?.classList.contains('react')
      ) {
        this.hideBaseEmojiList();
      }
    });
  }

  handleShowMoreOpts() {
    this.showMoreOpts = true;
  }

  handleHideMoreOpts() {
    this.showMoreOpts = false;
  }

  hideBaseEmojiList() {
    this.showBaseEmojiList = false;
  }

  addEmoji(emoji: string) {
    let updatedMessage = this.message();
    if (updatedMessage) {
      updatedMessage = {
        ...updatedMessage,
        emoji: emoji,
      };
      this.emojiAction.emit(updatedMessage);
    }
    this.hideBaseEmojiList();
  }

  removeEmoji() {
    let oldMessage = this.message();
    if (oldMessage) {
      let { emoji, ...updatedMessage } = oldMessage;
      this.emojiAction.emit(updatedMessage);
    }
  }

  handleReplyMessage(message: ChatMessageItemType) {
    this.replyAction.emit(message);
  }

  handleEditMessage(message: ChatMessageItemType){
    this.editAction.emit(message)
  }

  makeCopy(){
  }
}
