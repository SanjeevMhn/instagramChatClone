import { Component } from '@angular/core';
import { Info, LucideAngularModule, Phone, Search, Smile, SquarePen, Video } from 'lucide-angular';

@Component({
  selector: 'app-chat',
  imports: [LucideAngularModule],
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

  chatMessagesList: Array<{
    id: number;
    name: string;
    user_img: string;
    message: string;
    type: 'sent' | 'received';
  }> = [
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
  ];
}
