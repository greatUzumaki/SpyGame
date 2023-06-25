import { useState, useEffect } from 'preact/hooks';
import { usePlayers } from '../hooks/usePlayers';
import { useSettings } from '../hooks/useSettings';

export const Settings = () => {
  const { players, addPlayer, deletePlayer } = usePlayers();
  const [newPlayer, setNewPlayer] = useState('');
  const {
    handleSavePrompt,
    minutes,
    adjective,
    setAdjective,
    prompt,
    userPrompt,
    setMinutes,
    setPrompt,
    setUserPrompt,
    handleSaveUserPrompt,
  } = useSettings();

  const handleAddPlayer = () => {
    addPlayer(newPlayer);
    setNewPlayer('');
  };

  useEffect(() => {
    localStorage.setItem('players', JSON.stringify(players));
  }, [players]);

  return (
    <div class={'setting-container'}>
      <div>
        <p class={'section-title'}>Игроки</p>
        <div class={'add-user'}>
          <input
            onChange={(e) => setNewPlayer(e.currentTarget.value)}
            placeholder={'Леха'}
            value={newPlayer}
          />
          <button onClick={handleAddPlayer}>Добавить</button>
        </div>

        <div class={'divider'}></div>

        <div class={'players-list'}>
          {Boolean(players.length) &&
            players.map((p, i) => {
              return (
                <div key={p.name}>
                  <div>
                    <p class={'number'}>{i + 1}</p>
                    <p class={'name'}>{p.name}</p>
                  </div>
                  <button onClick={() => deletePlayer(i)}>Удалить</button>
                </div>
              );
            })}
        </div>
      </div>

      <div>
        <p class={'section-title'}>Время</p>

        <div class={'time'}>
          <button
            onClick={() => setMinutes((old) => (old === 1 ? 1 : old - 1))}
          >
            -
          </button>
          <p>{minutes} мин</p>
          <button onClick={() => setMinutes((old) => old + 1)}>+</button>
        </div>
      </div>

      <div>
        <p class={'section-title'}>Системный промпт</p>

        <div class={'prompt'}>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.currentTarget.value)}
            rows={8}
            placeholder={'Исключи локации - больница, тюрьма'}
          />
          <button onClick={handleSavePrompt}>Сохранить</button>
        </div>
      </div>

      <div>
        <p class={'section-title'}>Пользовательский промпт</p>

        <div class={'prompt'}>
          <textarea
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.currentTarget.value)}
            rows={8}
            placeholder={'Хочу локации из игр'}
          />
          <button onClick={handleSaveUserPrompt}>Сохранить</button>
        </div>
      </div>

      <div>
        <p class={'section-title'}>Локации с прилагательными</p>
        <button
          onClick={() =>
            setAdjective((old) => (old === 'true' ? 'false' : 'true'))
          }
        >
          {adjective === 'true' ? 'Выключить' : 'Включить'}
        </button>
      </div>
    </div>
  );
};
