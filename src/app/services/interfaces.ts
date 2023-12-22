export interface IRegisterForm {
  email: string;
  username: string;
  password: string;
}

export interface IAuthForm {
  login: string;
  password: string;
}

export interface IPostPreview {
  title: 'string';
  image: null | string;
  theme: 'string';
  id: number;
}

export interface IPostList {
  posts: IPostPreview[];
}

export interface IPost {
  title: string;
  content: string;
  image: string;
  theme: string;
  created_at: string;
}

export interface ICommentPost {
  content: string;
}

export interface IComment {
  id: number;
  content: string;
  date: string;
  avatar: null | string;
  username: string;
}
