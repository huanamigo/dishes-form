export type DishType = 'pizza' | 'soup' | 'sandwich';

export interface DishFormState {
  name: string;
  preparation_time: string;
  type: DishType;
  no_of_slices?: number;
  diameter?: number;
  spiciness_scale?: number;
  slices_of_bread?: number;
}

export interface ValidationErrors {
  [key: string]: string;
}