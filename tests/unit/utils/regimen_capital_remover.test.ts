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

  test('remove suffixes containing regular expression characters as literal text', () => {
    const remover = RegimenCapitalRemover.createDefault();
    expect(remover.remove('EMPRESA SCL (LIMITADA)')).toBe('EMPRESA');
    expect(remover.remove('EMPRESA SCS (SUPLEMENTADA)')).toBe('EMPRESA');
  });

  test('custom suffixes are not interpreted as regular expressions', () => {
    const remover = new RegimenCapitalRemover('S.A.', 'A|B');
    expect(remover.remove('EMPRESA S.A.')).toBe('EMPRESA');
    expect(remover.remove('EMPRESA SXAX')).toBe('EMPRESA SXAX');
    expect(remover.remove('EMPRESA A')).toBe('EMPRESA A');
    expect(remover.remove('EMPRESA A|B')).toBe('EMPRESA');
  });

  test('does not suffer from quadratic backtracking on long runs of spaces', () => {
    const remover = RegimenCapitalRemover.createDefault();
    const name = `EMPRESA${' '.repeat(50_000)}X`;
    const start = performance.now();
    expect(remover.remove(name)).toBe(name);
    expect(performance.now() - start).toBeLessThan(500);
  });

  test('throws when constructed without suffixes', () => {
    expect(() => new RegimenCapitalRemover()).toThrow('No se han establecido sufijos para remover');
    expect(() => new RegimenCapitalRemover('')).toThrow('No se han establecido sufijos para remover');
  });
});
