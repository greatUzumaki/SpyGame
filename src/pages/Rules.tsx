export const Rules = () => {
  return (
    <div class={'rules-container'}>
      Игра устанавливает локацию и каждому игроку назначается его роль. Одному
      из игроков локация не показывается и ему назначается роль "Жулик". Сядьте
      в круг и начните игру. Вопросы и ответы должны идти по кругу. Игрок задает
      вопрос об назначенной локации, пытаясь выяснить, кто является "Жуликом".
      Вопрос может быть в формате "Какие особенности есть в локации X?" или "Что
      особенного можно найти в локации Y?" Игроки, кроме "Жулика", отвечают на
      вопрос, стараясь не дать явных подсказок о локации. Они могут предоставить
      информацию о других местах или отвечать общими фразами, чтобы не раскрыть
      свою локацию. "Жулик" старается не вызывать подозрений, отвечая так, чтобы
      не выдать свою роль. Если "Жулик" понимает, о какой локации идет речь, он
      поднимает руку и говорит название локации. Установите таймер на
      определенное время (например, 5 минут). По истечении таймера все игроки
      голосуют, указывая на игрока, которого они считают "Жуликом". После
      голосования анонсируйте результаты.
    </div>
  );
};
