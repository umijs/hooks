import { renderHook, act } from '@testing-library/react-hooks';
import useAsyncEffect from '../index';
import { useState } from 'react';
import { sleep } from '../../utils/testingHelpers';

describe('useAsyncEffect', () => {
  it('should be defined', () => {
    expect(useAsyncEffect).toBeDefined();
  });

  it('should work without clean up', async () => {
    const hook = renderHook(() => {
      const [x, setX] = useState(0);
      useAsyncEffect(async () => {
        await sleep(100);
        setX(1);
      }, []);
      return x;
    });
    expect(hook.result.current).toBe(0);
    await act(async () => {
      await sleep(150);
    });
    expect(hook.result.current).toBe(1);
  });

  it('should work with clean up', async () => {
    const hook = renderHook(() => {
      const [x, setX] = useState(1);
      const [y, setY] = useState(0);
      useAsyncEffect(
        async (cleanUpWith) => {
          let cancelled = false;
          cleanUpWith(() => {
            cancelled = true;
          });
          await sleep(100);
          if (cancelled) return;
          setY(x);
        },
        [x],
      );
      return {
        y,
        setX,
      };
    });
    expect(hook.result.current.y).toBe(0);
    await act(async () => {
      await sleep(50);
      hook.result.current.setX(2);
    });
    await act(async () => {
      await sleep(80);
    });
    expect(hook.result.current.y).toBe(0);
    await act(async () => {
      await sleep(50);
    });
    expect(hook.result.current.y).toBe(2);
  });
});
