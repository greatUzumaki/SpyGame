export function setRoles(playersLen: number, roles: string[]) {
  const randomRoles = [...roles]; // Копирование массива ролей

  // Добавление случайной роли "Шпион" в массив ролей
  const spyIndex = Math.floor(Math.random() * playersLen);
  randomRoles[spyIndex] = 'Шпион';

  // Заполнение оставшихся ролей случайными значениями
  for (let i = roles.length; i < playersLen; i++) {
    const randomIndex = Math.floor(Math.random() * roles.length);
    randomRoles.push(roles[randomIndex]);
  }

  return randomRoles;
}
