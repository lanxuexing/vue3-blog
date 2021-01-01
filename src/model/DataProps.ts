export interface UserProps {
  isLogin: boolean;
  nickName?: string;
  name?: string;
  id?: number;
  _id?: string;
  columnId?: number;
  column?: string;
  email?: string;
  avatar?: ImageProps;
  description?: string;
}

export interface ImageProps {
  _id?: string;
  url?: string;
  createdAt?: string;
  fitUrl?: string;
}

export interface ColumnProps {
  _id: string;
  title: string;
  avatar?: ImageProps;
  description: string;
  createdAt?: string;
}

export interface PostProps {
  _id?: string;
  title: string;
  excerpt?: string;
  content?: string;
  image?: string | ImageProps;
  createdAt?: string;
  column: string;
  author?: string | UserProps;
  isHTML?: boolean;
}

export interface GlobalDataProps {
  columns: ColumnProps[];
  posts: PostProps[];
  user: UserProps;
  loading: boolean;
}

interface RuleProp {
  type: 'required' | 'email';
  message: string;
}

export interface ResponseType<T = {}> {
  code: number;
  msg: string;
  data: T;
}

export interface CheckCondition {
  format?: string[];
  size?: number;
}

export type RulesProp = RuleProp[]

export type TagType = 'input' | 'textarea';

export type UploadStatus = 'ready' | 'loading' | 'success' | 'error';

export type CheckFunction = (file: File) => boolean;

export type ErrorType = 'size' | 'format' | null;

export type MessageType = 'success' | 'error' | 'default';
