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
  name: string;
  preparation_time: string;
  no_of_slices?: string;
  diameter?: string;
  spiciness_scale?: string;
  slices_of_bread?: string;
}

export interface Touch {
  name: boolean;
  preparation_time: boolean;
  no_of_slices?: boolean;
  diameter?: boolean;
  spiciness_scale?: boolean;
  slices_of_bread?: boolean;
}