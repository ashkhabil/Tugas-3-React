const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.product.deleteMany({});
  
  await prisma.product.createMany({
    data: [
      { name: 'Pulpen', price: 5000 },
      { name: 'Buku Tulis', price: 12000 },
      { name: 'Spidol', price: 8000 },
      { name: 'Penggaris', price: 6000 },
      { name: 'Penghapus', price: 3000 },
    ],
  });
  console.log('Database seeded successfully with initial products!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
