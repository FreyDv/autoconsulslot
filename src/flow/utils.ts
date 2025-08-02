import { Locator } from 'playwright';

export async function waitForNotEmptyList(locator: Locator, attempt = 0): Promise<Locator[]> {
  await sleep(1, 'waitForNotEmptyList');
  const list = await locator.all();

  if (list.length > 0) {
    return list;
  }

  if (attempt === 5) {
    throw Error('Wait 5 seconds fo non empty list');
  } else {
    return waitForNotEmptyList(locator, attempt++);
  }
}

export function sleep(s: number, reason?: string): Promise<void> {
  console.log('Sleeping: ' + reason);
  return new Promise(resolve => setTimeout(resolve, s * 1000));
}
