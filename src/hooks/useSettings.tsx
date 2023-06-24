import { useEffect, useState, useCallback } from 'preact/hooks';

export const useSettings = () => {
  const [minutes, setMinutes] = useState(
    Number(localStorage.getItem('minutes')) || 5
  );
  const [prompt, setPrompt] = useState(localStorage.getItem('prompt') || '');

  useEffect(() => {
    localStorage.setItem('minutes', minutes.toString());
  }, [minutes]);

  const handleSavePrompt = useCallback(() => {
    localStorage.setItem('prompt', prompt);
  }, [prompt]);

  return {
    minutes,
    prompt,
    setPrompt,
    setMinutes,
    handleSavePrompt,
  };
};
