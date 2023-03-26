import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  storage!: Storage;
  constructor() {
    this.storage = window.localStorage;
  }

  setObject(key: string, value: any) {
    if (!value) return;
    this.storage[key] = JSON.stringify(value);
  }

  getValue<T>(key: string): T {
    const obj = JSON.parse(this.storage[key] || null);
    return <T>obj;
  }

  remove(key: string): any {
    this.storage.removeItem(key);
  }
  clear() {
    this.storage.clear();
  }
  get length(): number {
    return this.storage.length;
  }
  get isStorageEmpty(): boolean {
    return this.length === 0;
  }
}
