import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

async function main() {
    await prisma.user.create({
        data: {
            nome: 'Donna Noble',
            email: 'donna@noble.com',
            avatarUrl: 'https://github.com/gabrielrfmendes.png'
        }
    });

    await prisma.user.create({
        data: {
            nome: 'Mike Ross',
            email: 'mike@ross.com',
            avatarUrl: 'https://github.com/gabrielrfmendes.png'
        }
    });

    const user = await prisma.user.create({
        data: {
            nome: 'John Smith',
            email: 'john@smith.com',
            avatarUrl: 'https://github.com/gabrielrfmendes.png'
        }
    });

    const pool = await prisma.pool.create({
        data: {
            title: "John's pool",
            code: 'BOL123',
            ownerId: user.id,
            participants: {
                create: {
                    userId: user.id
                }
            }
        }
    })

    await prisma.game.create({
        data: {
            date: '2022-11-05T12:00:00.614Z',
            firstTeamCountryCode: 'AR',
            secondTeamCountryCode: 'BR'
        }
    });

    await prisma.game.create({
        data: {
            date: '2022-11-06T12:00:00.614Z',
            firstTeamCountryCode: 'BR',
            secondTeamCountryCode: 'DE',
            guesses: {
                create: {
                    firstTeamPoints: 14,
                    secondTeamPoints: 2,
                    participant: {
                        connect: {
                            userId_poolId: {
                                poolId: pool.id,
                                userId: user.id
                            }
                        }
                    }
                }
            }
        }
    })
}

main()