import { describe, expect, test } from 'vitest';
import RegimenCapitalRemover from '../../../src/utils/regimen_capital_remover';

describe('regimen capital remover', () => {
  test.each([
    ['SA', 'EMPRESA PATITO', 'SA'],
    ['SA with extra space', 'EMPRESA PATITO ', 'SA'],
    ['SA DE CV', 'EMPRESA PATITO', 'SA DE CV'],
    ['SAB', 'EMPRESA PATITO', 'SAB'],
    ['S DE RL', 'EMPRESA PATITO', 'S DE RL'],
  ])('most common cases: %s', (_label, expectedName, suffix) => {
    const fullname = `${expectedName} ${suffix}`;
    const remover = RegimenCapitalRemover.createDefault();
    expect(remover.remove(fullname)).toBe(expectedName.trim());
  });

  test('remove only one entry', () => {
    const fullname = 'AUDITORES SAB SA';
    const remover = RegimenCapitalRemover.createDefault();
    expect(remover.remove(fullname)).toBe('AUDITORES SAB');
  });

  test('remove S A P I DE CV', () => {
    const fullname = 'EMPRESA S A P I DE CV';
    const remover = RegimenCapitalRemover.createDefault();
    expect(remover.remove(fullname)).toBe('EMPRESA');
  });

  test('throws when constructed without suffixes', () => {
    expect(() => new RegimenCapitalRemover()).toThrow('No se han establecido sufijos para remover');
  });
});
