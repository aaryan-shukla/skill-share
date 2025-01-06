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
  gender?: string;
  location?: string;
  birthday?: string;
  summary?: string;
  website?: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  [key: string]: string | undefined;
}

export interface CardProps {
  title?: string;
  description?: string;
  bgImageSource?: string;
  tabUrl?: string;
}
// type Field = {
//   name: string;
//   type: string;
//   placeholder: string;
// };
export interface FormCardProps {
  heading: string;
  imageSource: string;
  onSubmit: (formData: UserData) => void;
  error: string;
}
export interface CourseCardProps {
  title: string;
  author: string;
  price: number;
  originalPrice: number;
  rating: number;
  imageUrl: string;
}
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}
