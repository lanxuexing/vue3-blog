export interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number;
  columnId?: number;
}

interface ImageProps {
  _id?: string;
  url?: string;
}

export interface ColumnProps {
  _id: string;
  title: string;
  avatar?: ImageProps;
  description: string;
  createdAt?: string;
}

export interface PostProps {
  id: number;
  title: string;
  content: string;
  image?: string;
  createdAt: string;
  columnId: number;
}

export interface GlobalDataProps {
  columns: ColumnProps[];
  posts: PostProps[];
  user: UserProps;
}

interface RuleProp {
  type: 'required' | 'email';
  message: string;
}

export type RulesProp = RuleProp[]

export type TagType = 'input' | 'textarea';
