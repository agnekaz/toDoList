import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import type { ReactElement, ReactNode } from 'react';
import { Provider } from 'react-redux';
import type { Task } from '../features/tasks/task';
import { setupStore } from '../store/store';

type AppStore = ReturnType<typeof setupStore>;

interface RenderWithReduxOptions extends Omit<RenderOptions, 'wrapper'> {
  preloadedState?: Partial<{ tasks: Task[] }>;
  store?: AppStore;
}

export function renderWithRedux(
  ui: ReactElement,
  { preloadedState, store, ...renderOptions }: RenderWithReduxOptions = {},
) {
  const usedStore = store ?? setupStore(preloadedState);
  function Wrapper({ children }: { children: ReactNode }) {
    return <Provider store={usedStore}>{children}</Provider>;
  }
  return { store: usedStore, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
