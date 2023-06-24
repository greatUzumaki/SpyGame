import { APP_URLS } from '../configs/urls';
import SpyImg from '/spy.png';

export function Home() {
  return (
    <div class={'home-container'}>
      <img src={SpyImg} width={'50%'} class={'spy-img'} />

      <div class={'links'}>
        <a href={APP_URLS.RULES}>Правила</a>
        <a href={APP_URLS.SETTINGS}>Настройки</a>
      </div>

      <a class={'start-btn'} href={APP_URLS.GAME}>
        Начать игру
      </a>
    </div>
  );
}
