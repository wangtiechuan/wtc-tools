import { prismaClicent } from "./client";

export async function disconnect(e?: any) {
  await prismaClicent.$disconnect();
  if (e) {
    console.error(e);
    process.exit(1);
  }
}
