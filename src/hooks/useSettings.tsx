import { useEffect, useState, useCallback } from 'preact/hooks';

export const useSettings = () => {
  const [userPrompt, setUserPrompt] = useState(
    localStorage.getItem('userPrompt') || ''
  );
  const [minutes, setMinutes] = useState(
    Number(localStorage.getItem('minutes')) || 5
  );
  const [adjective, setAdjective] = useState(
    localStorage.getItem('adjective') || 'true'
  );
  const [prompt, setPrompt] = useState(localStorage.getItem('prompt') || '');

  useEffect(() => {
    localStorage.setItem('minutes', minutes.toString());
  }, [minutes]);

  const handleSavePrompt = useCallback(() => {
    localStorage.setItem('prompt', prompt);
  }, [prompt]);

  const handleSaveUserPrompt = useCallback(() => {
    localStorage.setItem('userPrompt', userPrompt);
  }, [userPrompt]);

  useEffect(() => {
    localStorage.setItem('adjective', adjective);
  }, [adjective]);

  return {
    minutes,
    prompt,
    adjective,
    userPrompt,
    setUserPrompt,
    setAdjective,
    setPrompt,
    setMinutes,
    handleSavePrompt,
    handleSaveUserPrompt,
  };
};
