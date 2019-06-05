export function randomPick(list, number) {
  const arrayIn = [...list];
  let pick = [];

  for (let i = 0; i < number; i++) {
    const randomIndex = Math.floor(Math.random() * arrayIn.length);
    const value = arrayIn[randomIndex];
    pick = [...pick, value];
    arrayIn.splice(randomIndex, 1);
  }

  return pick;
}

export default {
  randomPick
};
