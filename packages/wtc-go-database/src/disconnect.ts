import { prismaClicent } from './client';

export async function disconnect() {
  try {
    await prismaClicent.$disconnect();
  } catch (e) {
    if (e) {
      console.error(e);
      process.exit(1);
    }
  }
}
