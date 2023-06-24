import { useState, useCallback } from 'preact/hooks';

export interface IPlayer {
  name: string;
}

export const usePlayers = () => {
  const [players, setPlayers] = useState<IPlayer[]>(
    JSON.parse(localStorage.getItem('players')) || []
  );

  const addPlayer = useCallback(
    (name: string) => setPlayers((old) => [...old, { name: name }]),
    []
  );

  const deletePlayer = useCallback(
    (i: number) => setPlayers((old) => old.filter((_, index) => index !== i)),
    []
  );

  return {
    players,
    addPlayer,
    deletePlayer,
  };
};
