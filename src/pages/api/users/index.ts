import type { NextApiRequest, NextApiResponse } from "next";

import { UserRole } from "@/db/models";
import { prisma } from "@/db/utils";

export interface UserDTO {
    id?: number;
    name: string;
    password: string;
    email: string;
    role: string;
}

const userHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body, query } = req;

  switch (method) {
    case 'GET':
      const opts = { filters: query };
      getAllUsers(res, opts);
      break;
    case 'POST':
      createUser(body, res);
      break;
    case 'DELETE':
      if (body.ids) {
        const { ids } = body;
        bulkDeleteUsers(ids, res);
      } else {
        res.status(400).end('Missing ids in request body');
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};

const getAllUsers = async (res: NextApiResponse, opts?: any ) => {
  const { filters = {}} = opts;
    
  try {
    const users = await prisma.user.findMany({ 
        where: { 
            name: { 
                contains: filters?.name ?? '',
            },
            email: { 
                contains: filters?.email ?? '',
            },
            role: {
                equals: filters?.role ?? UserRole.CUSTOMER,
            },
        },
        cacheStrategy: { swr: 60, ttl: 60 },
    });
    return res.json(users);
  } catch (error: any) {
    console.error({error});
    return res.status(error?.response?.status ?? 500).json({error});
  }
};

const createUser = async (body: Partial<UserDTO>, res: NextApiResponse) => {
  const user = {
    name: body.name ?? '',
    email: body.email ?? '',
    role: body.role ?? '',
    password: body.password ?? '',
  };

  try {
    const results = await prisma.user.create({
      data: user,
    });
    return results && res.status(201).setHeader('Location', `/users/${results.id}`);
  } catch (error: any) {
    console.error({error});
    return res.status(error?.response?.status ?? 500).json({error});
  }
};

const bulkDeleteUsers = async (ids: string[], res: NextApiResponse) => {
  try {
    const results = await prisma.user.deleteMany({
      where: {
        id: { in: ids.map(id => parseInt(id)) }
      }
    });

    return res.json({ results });
  } catch (error: any) {
    console.error({error});
    return res.status(error?.response?.status ?? 500).json({error});
  }
};

export default userHandler;