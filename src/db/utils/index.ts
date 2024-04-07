import bcrypt from 'bcrypt';
import { PrismaClient } from '../../../prisma/generated/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

export const prisma = new PrismaClient({
    datasources: { db: { url: process.env.DATABASE_URL } },
})
.$extends({
    query: {
            user: {
                $allOperations({ operation, args, query }) {
                    if (['create', 'update'].includes(operation) && (args as any).data && (args as any).data['password']) {
                        (args as any).data['password'] = bcrypt.hashSync((args as any).data['password'], 10)
                    }
                    return query(args)
                }
            }
    }
})
.$extends(withAccelerate())