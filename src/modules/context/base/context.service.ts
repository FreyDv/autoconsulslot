import { Injectable } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';

export type ContextStore = Map<string, any>;

@Injectable()
export class ContextService {
  private readonly als = new AsyncLocalStorage<ContextStore>();

  /**
   * Initializes a new context store and runs the callback within it.
   */
  run<T>(callback: (...args: any[]) => T, initial?: Record<string, any>): T {
    const store = new Map<string, any>(Object.entries(initial || {}));
    return this.als.run(store, callback);
  }

  /**
   * Sets a key/value in the current store.
   */
  set<T = any>(key: string, value: T): void {
    const store = this.als.getStore();
    if (!store) {
      throw new Error('No async context available');
    }
    store.set(key, value);
  }

  /**
   * Retrieves a value by key from the current store.
   */
  get<T = any>(key: string): T {
    const store = this.als.getStore();
    if (!store) {
      throw Error(`No async context available for kay: ${key}`);
    }
    return store?.get(key);
  }

  /**
   * Gets the raw store Map.
   */
  getStore(): ContextStore | undefined {
    return this.als.getStore();
  }
}