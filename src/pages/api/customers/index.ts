import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@/db/utils"; 
import Error from "next/error";

export interface CustomerDTO {
    id?: number;
    email: string;
    phone?: string;
    contactPreference?: string;
    firstName?: string;
    lastName?: string;
    addresses?: any[];
    orders?: any[];
}

const customerHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body, query } = req;

  switch (method) {
    case 'GET':
      const opts = { filters: query };
      getAllCustomers(res, opts);
      break;
    case 'POST':
      createCustomer(body, res);
      break;
    case 'DELETE':
      if (body.ids) {
        const { ids } = body;
        bulkDeleteCustomers(ids, res);
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

const getAllCustomers = async (res: NextApiResponse, opts?: any ) => {
  const { filters = {}} = opts;
    
  try {
    const customers = await prisma.customer.findMany({ 
        where: {
            email: { 
                contains: filters?.email ?? '',
            },
        },
        cacheStrategy: { swr: 60, ttl: 60 },
    });
    
    return res.json(customers);
  } catch (error: any) {
    console.error({error});
    return res.status(error?.response?.status ?? 500).json({error});
  }
};

const createCustomer = async (body: Partial<CustomerDTO>, res: NextApiResponse) => {
const { orders, addresses, ...rest } = body;
const customer = {
    ...rest,
    email: body.email ?? '',
};

try {
    const results = await prisma.customer.create({
        data: customer,
    });

    console.log({results});    
    return results && res.status(201).json({ id: results.id });
} catch (error: any) {
    console.error({error});
    if(error.name === 'PrismaClientKnownRequestError') {
      return res.status(409).send({error});
    }
    return res.status(error?.response?.status ?? 500).send({error});
}
};

const bulkDeleteCustomers = async (ids: string[], res: NextApiResponse) => {
  try {
    const results = await prisma.customer.deleteMany({
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

export default customerHandler;