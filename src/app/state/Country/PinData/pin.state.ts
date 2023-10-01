export interface Pin {
  collaboration: [];
  id: string;
  title: string;
  privacy: string;
}

export interface PinState {
  pins: Pin[] | null;
}

export const initStatePin: PinState = {
  pins: [],
};
