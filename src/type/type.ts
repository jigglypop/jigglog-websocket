export type IUsers = {
  [name: string]: IJoiner;
};

export type IJoiner = {
  user: string;
  model: string;
  error: string;
};

export type IMsg = {
  user: string;
  msg: string;
  createdAt: string;
};
export type IJoin = { room: string; user: IJoiner };
