import {
  AfterViewChecked,
  Component,
  ElementRef,
  HostListener,
  inject,
  signal,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import {
  Info,
  LucideAngularModule,
  Phone,
  Reply,
  Search,
  Smile,
  SquarePen,
  Video,
  X,
} from 'lucide-angular';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Emoji } from '../../services/emoji/emoji';
import { ChatMessageItem } from '../../components/chat-message-item/chat-message-item';

export type ChatMessageItemType = {
  id: number;
  name: string;
  user_img: string;
  message: string;
  type: 'sent' | 'received';
  emoji?: string;
  reply?: ChatMessageItemType;
};

@Component({
  selector: 'app-chat',
  imports: [LucideAngularModule, ReactiveFormsModule, ChatMessageItem],
  templateUrl: './chat.html',
  styleUrl: './chat.css',
})
export class Chat {
  search = Search;
  sendMessage = SquarePen;
  phone = Phone;
  video = Video;
  info = Info;
  emoji = Smile;
  reply = Reply;
  close = X;

  chatList: Array<{
    id: number;
    name: string;
    profile_img: string;
    message: string;
    active: boolean;
  }> = [
    {
      id: 1,
      name: 'John Doe',
      profile_img: '',
      message: "What's up",
      active: false,
    },
    {
      id: 2,
      name: 'Sam Smith',
      profile_img: '',
      message: 'Sent an attachment',
      active: false,
    },
    {
      id: 3,
      name: 'Julia Garcia',
      profile_img: '',
      message: 'Sent a photo',
      active: true,
    },
    {
      id: 5,
      name: 'Ana White',
      profile_img: '',
      message: 'Sent an attachment',
      active: false,
    },
  ];

  chatMessagesList: WritableSignal<Array<ChatMessageItemType>> = signal([
    {
      id: 1,
      name: '',
      user_img: '',
      message: 'Lets meet up today!',
      type: 'received',
    },
    {
      id: 2,
      name: '',
      user_img: '',
      message: 'Okay! What time and place do you recommend?',
      type: 'sent',
    },
    {
      id: 3,
      name: '',
      user_img: '',
      message: 'Any place will do, lets meet around 5:30 pm',
      type: 'received',
    },
    {
      id: 4,
      name: '',
      user_img: '',
      message: 'Great lets meet near 5th Avenue,',
      type: 'sent',
    },
    {
      id: 5,
      name: '',
      user_img: '',
      message: "Sure thing, I'call you",
      type: 'received',
      reply: {
        id: 4,
        name: '',
        user_img: '',
        message: 'Great lets meet near 5th Avenue,',
        type: 'sent',
      },
    },
  ]);

  messageReply: ChatMessageItemType | undefined;

  chatForm: FormGroup = new FormGroup({
    message: new FormControl('', [Validators.required]),
  });

  @ViewChild('messageList', { static: false }) messageList!: ElementRef<HTMLUListElement>;
  messageListHeight!: number;

  emojiService = inject(Emoji);

  @HostListener('keydown', ['$event'])
  handleOnEscPressed(event: KeyboardEvent) {
    if (event.key == 'Escape') {
      if (this.messageReply) this.messageReply = undefined;
    }
  }

  @ViewChild('chatInput', { static: false }) chatInputRef!: ElementRef<HTMLInputElement>;

  onChatSend() {
    if (this.chatForm.invalid) {
      this.chatForm.markAllAsTouched();
      return;
    }

    this.chatMessagesList.update((val) => [
      ...val,
      {
        id: this.chatMessagesList().length + 1,
        name: '',
        user_img: '',
        message: this.chatForm.get('message')?.value,
        type: 'sent',
        reply: this.messageReply,
      },
    ]);

    this.messageListHeight = this.messageList.nativeElement.scrollHeight;

    this.chatForm.reset();
    this.messageReply = undefined;

    this.scrollMessageListToLast()
  }

  scrollMessageListToLast(){
    requestAnimationFrame(() => {
      if (
        this.messageListHeight !== this.messageList.nativeElement.scrollHeight &&
        this.messageList.nativeElement.scrollHeight !==
          this.messageList.nativeElement.scrollTop + this.messageList.nativeElement.offsetHeight
      ) {
        this.messageList.nativeElement.scrollTo(0, this.messageList.nativeElement.scrollHeight);
      }
    })

  }

  handleEmojiAction(data: ChatMessageItemType) {
    this.chatMessagesList.update((msgs) =>
      msgs.map((msg) =>
        msg.id == data.id
          ? !data.hasOwnProperty('emoji') && msg.hasOwnProperty('emoji')
            ? {
                ...data,
              }
            : { ...msg, ...data }
          : msg
      )
    );
  }

  handleMessageReply(message: ChatMessageItemType) {
    this.messageReply = message;
    this.chatInputRef.nativeElement.focus();
  }

  removeReplyMessage() {
    this.messageReply = undefined;
  }
}
