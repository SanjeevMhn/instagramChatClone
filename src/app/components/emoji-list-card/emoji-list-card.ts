import { Component, inject } from '@angular/core';
import { BehaviorSubject, switchMap } from 'rxjs';
import { Activities, AnimalsNature, EmojiCategoryType, Flags, FoodDrink, Objects, People, Simleys, Symbols, TravelPlaces } from '../../utils/common-utils';
import { Emoji } from '../../services/emoji/emoji';
import { AsyncPipe } from '@angular/common';
import { KebabCaseToTextPipe } from '../../pipes/kebabCaseToText/kebab-case-to-text-pipe';

@Component({
  selector: 'app-emoji-list-card',
  imports: [AsyncPipe, KebabCaseToTextPipe],
  templateUrl: './emoji-list-card.html',
  styleUrl: './emoji-list-card.css'
})
export class EmojiListCard {
  activeCategory = new BehaviorSubject<EmojiCategoryType>(Simleys)
  emojiService = inject(Emoji)

  // emojiCategories = this.emojiService.getEmojiCategories()
  emojiCategories = [
    {
      id: 1,
      code: '\\1F602',
      category: Simleys
    },
    {
      id: 2,
      code: '\\1F44D',
      category: People
    },
    {
      id: 3,
      code: '\\1F436',
      category: AnimalsNature
    },
    {
      id: 4,
      code: '\\1F374',
      category: FoodDrink
    },
    {
      id: 5,
      code: '\\1F310',
      category: TravelPlaces
    },
    {
      id: 6,
      code: '\\1F389',
      category: Activities
    },
    {
      id: 7,
      code: '\\1F48E',
      category: Objects
    },
    {
      id: 8,
      code: '\\1F523',
      category: Symbols
    },
    {
      id: 9,
      code: '\\1F6A9',
      category: Flags 
    }
  ]

  emojiList = this.activeCategory.pipe(
    switchMap((category: EmojiCategoryType) => {
      return this.emojiService.getEmojisInCategory(category)
    })
  )

  setActiveCategory(category: EmojiCategoryType){
    this.activeCategory.next(category)
  }
}
