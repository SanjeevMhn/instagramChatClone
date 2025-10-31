export const Simleys       = 'smileys-emotion' as const;
export const People        = 'people-body' as const;
export const Component     = 'component' as const;
export const AnimalsNature = 'animals-nature' as const;
export const FoodDrink     = 'food-drink' as const;
export const TravelPlaces  = 'travel-places' as const;
export const Activities    = 'activities' as const;
export const Objects       = 'objects' as const;
export const Symbols       = 'symbols' as const;
export const Flags         = 'flags' as const;


export type EmojiCategoryType =  typeof Simleys | 
                                 typeof People | 
                                 typeof Component |
                                 typeof AnimalsNature |
                                 typeof FoodDrink |
                                 typeof TravelPlaces | 
                                 typeof Activities | 
                                 typeof Objects |
                                 typeof Symbols |
                                 typeof Flags
