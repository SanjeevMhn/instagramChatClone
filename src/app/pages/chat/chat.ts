import {
  AfterViewChecked,
  Component,
  ElementRef,
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
} from 'lucide-angular';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Emoji } from '../../services/emoji/emoji';
import { ChatMessageItem } from "../../components/chat-message-item/chat-message-item";

export type ChatMessageItemType = {
  id: number;
  name: string;
  user_img: string;
  message: string;
  type: 'sent' | 'received';
};

@Component({
  selector: 'app-chat',
  imports: [LucideAngularModule, ReactiveFormsModule, ChatMessageItem],
  templateUrl: './chat.html',
  styleUrl: './chat.css',
})
export class Chat implements AfterViewChecked {
  search = Search;
  sendMessage = SquarePen;
  phone = Phone;
  video = Video;
  info = Info;
  emoji = Smile;
  reply = Reply;

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
  ]);

  chatForm: FormGroup = new FormGroup({
    message: new FormControl('', [Validators.required]),
  });

  @ViewChild('messageList', { static: false }) messageList!: ElementRef<HTMLUListElement>;
  messageListHeight!: number;

  emojiService = inject(Emoji);

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
      },
    ]);

    this.messageListHeight = this.messageList.nativeElement.scrollHeight;

    this.chatForm.reset();
  }

  ngAfterViewChecked(): void {
    if (
      this.messageListHeight !== this.messageList.nativeElement.scrollHeight &&
      this.messageList.nativeElement.scrollHeight !==
        this.messageList.nativeElement.scrollTop + this.messageList.nativeElement.offsetHeight
    ) {
      this.messageList.nativeElement.scrollTo(0, this.messageList.nativeElement.scrollHeight);
    }
  }


  getEmojis() {}
}
