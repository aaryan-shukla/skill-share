export interface DateItem {
  day: string;
  date: string;
  fullDate: string;
}

export default interface Session {
  id: string;
  date: string;
  time: string;
  name: string;
  description: string;
  maxParticipants: number;
  currentParticipants: number;
  price: number;
}
