import { Routes } from '@angular/router';
import { Chat } from './pages/chat/chat';
import { BaseLayout } from './layout/base-layout/base-layout';
import { EmojiList } from './pages/emoji-list/emoji-list';

export const routes: Routes = [
  {
    path: '',
    component: BaseLayout,
    children: [
      {
        path: 'chat', component: Chat
      },
      {
        path: '', redirectTo: 'chat', pathMatch: 'full'
      }
    ]
  },
  {
    path: 'emoji-list',
    component: EmojiList
  }

];
