import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {
  Boxes,
  Circle,
  Clapperboard,
  Compass,
  Heart,
  House,
  Instagram,
  LucideAngularModule,
  LucideIconData,
  MessageCircleMore,
  Search,
  SquarePlus,
  TextAlignJustify,
} from 'lucide-angular';

@Component({
  selector: 'app-base-layout',
  imports: [RouterOutlet, LucideAngularModule, RouterLink, RouterLinkActive],
  templateUrl: './base-layout.html',
  styleUrl: './base-layout.css',
})
export class BaseLayout {
  router = inject(Router);

  logo = Instagram;

  bottomNavList: Array<{
    id: number;
    name: string;
    link: string;
    icon: LucideIconData;
  }> = [
    {
      id: 9,
      name: 'more',
      link: '',
      icon: TextAlignJustify,
    },
    {
      id: 10,
      name: 'meta',
      link: '',
      icon: Boxes,
    },
  ];

  navList: Array<{
    id: number;
    name: string;
    link: string;
    icon: LucideIconData;
  }> = [
    {
      id: 1,
      name: 'home',
      link: '',
      icon: House,
    },
    {
      id: 2,
      name: 'search',
      link: '',
      icon: Search,
    },
    {
      id: 3,
      name: 'explore',
      link: '',
      icon: Compass,
    },
    {
      id: 4,
      name: 'reels',
      link: '',
      icon: Clapperboard,
    },
    {
      id: 5,
      name: 'messages',
      link: '/chat',
      icon: MessageCircleMore,
    },
    {
      id: 6,
      name: 'notifications',
      link: '',
      icon: Heart,
    },
    {
      id: 7,
      name: 'create',
      link: '',
      icon: SquarePlus,
    },
    {
      id: 8,
      name: 'Profile',
      link: '',
      icon: Circle,
    },
  ];
}
