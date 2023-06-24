import { useState, useEffect } from 'preact/hooks';
import { usePlayers } from '../hooks/usePlayers';
import { useSettings } from '../hooks/useSettings';

export const Settings = () => {
  const { players, addPlayer, deletePlayer } = usePlayers();
  const [newPlayer, setNewPlayer] = useState('');
  const { handleSavePrompt, minutes, prompt, setMinutes, setPrompt } =
    useSettings();

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
        <p class={'section-title'}>Промпт</p>

        <div class={'prompt'}>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.currentTarget.value)}
            rows={8}
            placeholder={'Хочу ебанутые локации'}
          />
          <button onClick={handleSavePrompt}>Сохранить</button>
        </div>
      </div>
    </div>
  );
};
