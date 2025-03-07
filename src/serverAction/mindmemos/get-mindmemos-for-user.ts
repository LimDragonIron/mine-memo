'use server'

import { getSession } from '@/serverAction/auth'
import prisma from '@/lib/prisma'

export async function getMindmemosForUser() {
    const session = await getSession()
    
    if(!session?.user) {
        throw new Error('Unauthorized')
    }
    
    const mindmemos = await prisma.mindMap.findMany({
        where: {
            userId: session.user.id
        },
        orderBy: {
            createdAt: 'asc',
        },
    })

    return mindmemos
}