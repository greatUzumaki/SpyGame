import { VNode } from 'preact';
import { useState, useLayoutEffect } from 'preact/hooks';
import { Timer } from '../components/Timer';
import { usePlayers } from '../hooks/usePlayers';
import { setRoles as SR } from '../utils/setRoles';
import Sound from '/notif.mp3';
import { Configuration, OpenAIApi } from 'openai';
import { useSettings } from '../hooks/useSettings';

const configuration = new Configuration({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
});

type TStage = 'LOADING' | 'READY' | 'GAME' | 'END';

export const Game = () => {
  const { players } = usePlayers();
  const { minutes, prompt, adjective } = useSettings();

  const [loading, setLoading] = useState(true);
  const [activePlayer, setActivePlayer] = useState(0);
  const [showCard, setShowCard] = useState(false);
  const [stage, setStage] = useState<TStage>('LOADING');
  const [roles, setRoles] = useState<string[]>([]);
  const [location, setLocation] = useState('');

  useLayoutEffect(() => {
    const fetch = async () => {
      const openai = new OpenAIApi(configuration);

      const chatCompletion = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `Будь ведущем игры шпион - тебе нужно сгенерировать случайную локацию ${
              adjective === 'false' ? 'без прилагательных' : ''
            }и 3-4 роли без подробностей которые соответствуют этой локации. ${
              prompt ? 'Предпочтения по игре - ' + prompt : ''
            }`,
          },
          {
            role: 'assistant',
            content:
              '{"location": "Бар", "roles": ["Бармен", "Официант", "Клиент"]}',
          },
          { role: 'user', content: 'Создай локацию и роли' },
        ],
      });

      const response = chatCompletion.data.choices[0].message.content.replace(
        /\n/g,
        ''
      );
      const parsedResponse: { location: string; roles: string[] } =
        JSON.parse(response);

      const r = SR(players.length, parsedResponse.roles);
      setRoles(r);
      setLocation(parsedResponse.location);
      setLoading(false);
      setStage('READY');
    };

    fetch();
  }, []);

  const handleNextPlayer = () => {
    setShowCard(false);
    const index = activePlayer + 1;
    if (index === players.length) {
      setStage('GAME');
    } else {
      setActivePlayer(index);
    }
  };

  const ReadyStage = () => {
    const isSpy = roles[activePlayer] === 'Шпион';

    return showCard ? (
      <div class={`card ${isSpy ? 'spy' : ''}`} onClick={handleNextPlayer}>
        {isSpy ? (
          <p>Вы - Шпион!</p>
        ) : (
          <div class={'info'}>
            <div>
              <p class={'loc'}>Локация</p>
              <p class={'loc-name'}>{location}</p>
            </div>
            <div>
              <p class={'role'}>Ваша роль</p>
              <p class={'role-name'}>{roles[activePlayer]}</p>
            </div>
          </div>
        )}
      </div>
    ) : (
      <div class={'card'} onClick={() => setShowCard(true)}>
        <p class={'name'}>{players[activePlayer].name}</p>{' '}
        <p class={'hint'}>Нажмите чтобы узнать локацию и роль</p>
      </div>
    );
  };

  const EndStage = () => {
    return (
      <div class={'end'}>
        <p>Шпионом был</p>
        <p class={'spy-player'}>{players[roles.indexOf('Шпион')].name}</p>
        <audio src={Sound} autoPlay />
      </div>
    );
  };

  const renderStage: { [key: string]: VNode } = {
    READY: <ReadyStage />,
    GAME: <Timer initialMinutes={minutes} onTimeout={() => setStage('END')} />,
    END: <EndStage />,
    LOADING: null,
  };

  return (
    <div class={'game-container'}>
      {loading ? (
        <div class={'loading'}>
          <p>Загружаю локацию...</p>
        </div>
      ) : (
        renderStage[stage]
      )}
    </div>
  );
};
