export type QuizQuestion = {
  question: string;
  options: string[];
  answer: number;
};

export type Lesson = {
  id: string;
  title: string;
  duration: string;
  preview?: boolean;
  quiz: QuizQuestion[];
};

export type Course = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  author: string;
  authorRole: string;
  price: number;
  rating: number;
  reviewCount: number;
  duration: string;
  lessonCount: number;
  certificate: boolean;
  language: string;
  level: string;
  image: string;
  trailerUrl?: string;
  accent: string;
  tags: string[];
  lessons: Lesson[];
  reviews: { name: string; role: string; text: string; rating: number }[];
};

export type User = {
  name: string;
  email: string;
};

export type AppStateContext = {
  courses: Course[];
  purchasedCourses: string[];
  user: User | null;
  signIn: (user: User) => void;
  signOut: () => void;
  purchaseCourse: (courseId: string) => void;
  addCourse: (course: Course) => void;
};
