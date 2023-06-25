export function setRoles(playersLen: number, roles: string[]) {
  const randomRoles = [...roles];

  const spyIndex = Math.floor(Math.random() * playersLen);
  randomRoles[spyIndex] = 'Шпион';

  for (let i = roles.length; i < playersLen; i++) {
    const randomIndex = Math.floor(Math.random() * roles.length);
    randomRoles.push(roles[randomIndex]);
  }

  return randomRoles;
}
