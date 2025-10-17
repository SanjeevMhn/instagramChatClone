import { Routes } from '@angular/router';
import { Chat } from './pages/chat/chat';
import { BaseLayout } from './layout/base-layout/base-layout';

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

];
