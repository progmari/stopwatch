import React, { useEffect, useState } from 'react';

import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import './App.css';

function App() {
  const [time, setTime] = useState(0);
  const [status, setStatus] = useState('stop');

  useEffect(() => {
    const unsubscribe$ = new Subject();

    interval(1000)
      .pipe(takeUntil(unsubscribe$))
      .subscribe(() => {
        if (status === 'start') {
          setTime(val => val + 1000);
        }
      });

    return () => {
      unsubscribe$.next();
      unsubscribe$.complete();
    };
  }, [status]);

  const start = React.useCallback(() => {
    setStatus('start');
  }, []);

  const stop = React.useCallback(() => {
    setStatus('stop');
    setTime(0);
  }, []);

  const reset = React.useCallback(() => {
    setTime(0);
  }, []);

  const wait = React.useCallback(() => {
    setStatus('wait');
  }, []);

  return (
    <div className="app">
      <div className="app-content">
        <div className="time-block">
          {new Date(time).toISOString().slice(11, 19)}
        </div>
        <button
          type="button"
          className="button"
          onClick={start}
        >
          Start
        </button>
        <button
          type="button"
          className="button"
          onClick={stop}
        >
          Stop
        </button>
        <button
          type="button"
          className="button"
          onClick={reset}
        >
          Reset
        </button>
        <button
          type="button"
          className="button"
          onDoubleClick={wait}
        >
          Wait
        </button>
      </div>
    </div>
  );
}

export default App;
