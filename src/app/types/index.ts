export interface LandingButtonProps {
  text?: string;
  onClick?: () => void;
}

export interface DateItem {
  day: string;
  date: string;
  fullDate: string;
}

export interface Session {
  id: string;
  date: string;
  time: string;
  name: string;
  description: string;
  maxParticipants: number;
  currentParticipants: number;
  price: number;
}

export interface UserData {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  photoUrl: string;
  address: string;
}
