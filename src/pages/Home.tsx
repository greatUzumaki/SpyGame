import { APP_URLS } from '../configs/urls';
import { usePlayers } from '../hooks/usePlayers';
import SpyImg from '/spy.png';

export function Home() {
  const { players } = usePlayers();
  const noPlayers = !Boolean(players.length);

  return (
    <div class={'home-container'}>
      <img src={SpyImg} width={'50%'} class={'spy-img'} />

      <div class={'links'}>
        <a href={APP_URLS.RULES}>Правила</a>
        <a href={APP_URLS.SETTINGS}>Настройки</a>
      </div>

      <a
        class={`start-btn ${noPlayers ? 'disabled' : ''}`}
        href={noPlayers ? '#' : APP_URLS.GAME}
      >
        Начать игру
      </a>
      {noPlayers && <p>Добавьте игроков</p>}
    </div>
  );
}
