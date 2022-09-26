import { isDevMode } from '@angular/core';

const mockValue: { [k: string]: any } = {
  email: 'mock@value.com',
  number: 999999999,
  date: new Date().toISOString().split('T')[0],
  text: 'mock value',
  select: 1,
};

export const fillForm = (fieldType: string = 'text') =>
  isDevMode() ? mockValue[fieldType] : null;
