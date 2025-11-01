import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  output,
  ViewChild,
} from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  map,
  startWith,
  Subject,
  switchMap,
  tap,
} from 'rxjs';
import {
  Activities,
  AnimalsNature,
  EmojiCategoryType,
  Flags,
  FoodDrink,
  Objects,
  People,
  Simleys,
  Symbols,
  TravelPlaces,
} from '../../utils/common-utils';
import { Emoji } from '../../services/emoji/emoji';
import { AsyncPipe } from '@angular/common';
import { KebabCaseToTextPipe } from '../../pipes/kebabCaseToText/kebab-case-to-text-pipe';
import { CircleX, LucideAngularModule, Search, X } from 'lucide-angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-emoji-list-card',
  imports: [AsyncPipe, KebabCaseToTextPipe, LucideAngularModule, FormsModule],
  templateUrl: './emoji-list-card.html',
  styleUrl: './emoji-list-card.css',
})
export class EmojiListCard implements AfterViewInit {
  searchIcon = Search;
  closeIcon = CircleX;
  activeCategory = new BehaviorSubject<EmojiCategoryType>(Simleys);
  emojiService = inject(Emoji);
  emojiCategories = [
    {
      id: 1,
      code: '\\1F602',
      category: Simleys,
    },
    {
      id: 2,
      code: '\\1F44D',
      category: People,
    },
    {
      id: 3,
      code: '\\1F436',
      category: AnimalsNature,
    },
    {
      id: 4,
      code: '\\1F374',
      category: FoodDrink,
    },
    {
      id: 5,
      code: '\\1F310',
      category: TravelPlaces,
    },
    {
      id: 6,
      code: '\\1F389',
      category: Activities,
    },
    {
      id: 7,
      code: '\\1F48E',
      category: Objects,
    },
    {
      id: 8,
      code: '\\1F523',
      category: Symbols,
    },
    {
      id: 9,
      code: '\\1F6A9',
      category: Flags,
    },
  ];

  showLoader = false;

  @ViewChild('searchInput', { static: false }) searchInputRef!: ElementRef<HTMLInputElement>;

  ngAfterViewInit(): void {
    this.searchInputRef.nativeElement.focus();
  }

  emojiList = this.activeCategory.pipe(
    switchMap((category: EmojiCategoryType) => {
      return this.emojiService.getEmojisInCategory(category);
    })
  );

  searchEmojiSearchSubject = new BehaviorSubject<string>('');

  hideForSearchItem = false;

  searchEmojiSearchText = this.searchEmojiSearchSubject.pipe(
    debounceTime(400),
    map((text) => text),
    tap((text) => {
      if (text.length > 0) {
        this.hideForSearchItem = true;
      } else {
        this.hideForSearchItem = false;
      }
    })
  );

  getEmojiList = combineLatest([this.searchEmojiSearchText, this.activeCategory]).pipe(
    switchMap(([search, category]) => {
      if (search.length > 0) {
        return this.emojiService.getSearchEmojis(search);
      }
      return this.emojiService.getEmojisInCategory(category);
    })
  );

  setActiveCategory(category: EmojiCategoryType) {
    this.activeCategory.next(category);
  }

  onEmojiSearch(emoji: any) {
    this.searchEmojiSearchSubject.next(emoji.target.value);
  }

  resetSearchEmoji() {
    this.searchEmojiSearchSubject.next('');
    this.searchInputRef.nativeElement.value = ''
  }

  listEmojiAction = output<string>();
  sendEmoji(emoji: string) {
    this.listEmojiAction.emit(emoji);
  }
}
