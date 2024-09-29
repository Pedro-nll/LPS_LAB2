export const selectApresentacao = (rootReducer) => {
  const user = rootReducer.userReducer.currentUser;
  if (user == null) {
    return 'Usuario nao encontrado';
  }
  return `Eu sou ${user.name} e tenho ${user.age}`;
};
