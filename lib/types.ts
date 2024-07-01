export type Movie = {
  id: string;
  title: string;
  release_date: string;
  genre_ids: string[] | string;
  duration: string | number;
  coverImage: string;
};

export type Rating = {
  id: string;
  movie_id: string;
  user_id: string;
  rating: number;
  comment: string;
};

export type Saved = {
  id: string;
  movie_id: string;
  user_id: string;
};

export enum AuthState {
  SIGN_IN,
  SIGN_UP,
  RESET_PASSWORD,
}

export type Profile = {
  id: string;
  updated_at: Date;
  username: string;
  full_name: string;
  avatar_url: string;
  website: string;
};
