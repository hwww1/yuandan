export interface GreetingData {
  message: string;
  imageUrl?: string;
}

export enum AppState {
  IDLE = 'IDLE',
  OPENING = 'OPENING',
  REVEALED = 'REVEALED',
}