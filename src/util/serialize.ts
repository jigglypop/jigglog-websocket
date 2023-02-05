// 시리얼라이징
export const serialize = (user: any) => {
  delete user.hashedPassword;
  return user;
};
