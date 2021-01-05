import { act, renderHook } from '@testing-library/react-hooks';
import useSetState from '../index';

describe('useSetState', () => {
  it('should be defined', () => {
    expect(useSetState).toBeDefined();
  });

  const setUp = <T extends object>(initialValue: T) =>
    renderHook(() => {
      const [state, setState, reset] = useSetState<T>(initialValue);
      return {
        state,
        setState,
        reset,
      } as const;
    });

  it('should support initialValue', () => {
    const hook = setUp({
      hello: 'world',
    });
    expect(hook.result.current.state).toEqual({ hello: 'world' });
  });

  it('should support object', () => {
    const hook = setUp<any>({
      hello: 'world',
    });
    act(() => {
      hook.result.current.setState({ foo: 'bar' });
    });
    expect(hook.result.current.state).toEqual({ hello: 'world', foo: 'bar' });
  });

  it('should support function update', () => {
    const hook = setUp({
      count: 0,
    });
    act(() => {
      hook.result.current.setState((prev) => ({ count: prev.count + 1 }));
    });
    expect(hook.result.current.state).toEqual({ count: 1 });
  });

  it('should support reset', () => {
    const hook = setUp({
      hello: 'world',
    });
    act(() => {
      hook.result.current.setState({ hello: '' });
      hook.result.current.reset();
    });
    expect(hook.result.current.state).toEqual({ hello: 'world' });
  });
});
