import { prisma } from "@/db/utils";
import type { NextApiRequest, NextApiResponse } from "next/types";

const userHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query, body } = req;
  const userId = query.id as string;
  
  switch (method) {
    case 'GET':
      getUserById(userId, res);
      break;      
    case 'PUT':
      updateUserById(body, res);
      break;
    case 'DELETE':
      deleteUserById(userId, res);
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};

const getUserById = async (id: string, res: NextApiResponse) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
    });

    if (!user) {
      return res.status(404).json({
        status: 404,
        message: 'Not Found',
      });
    }

    return res.json({ ...user });
  } catch (error: any) {
    console.error({error});
    return res.status(error?.response?.status ?? 500).json({error});
  }
};

const updateUserById = async (body: any, res: NextApiResponse) => {
    try {
      const result = await prisma.user.update({
        where: { id: parseInt(body.id) },
        data: {
          ...body,
        },
      });
  
      if(!result) {
        return res.status(404).json({
          status: 404,
          message: 'Not Found',
        });
      }
    
      return res.json(result);
    } catch (error: any) {
      console.error({error});
      return res.status(error?.response?.status ?? 500).json({error});
    }
  };
  
  const deleteUserById = async (id: string, res: NextApiResponse) => {
    try {
      const results = await prisma.user.delete({
        where: { id: Number(id) },
      });
  
      if (!results) {
        return res.status(404).json({
          status: 404,
          message: 'Not Found',
        });
      }
    
      return res.send('Successfully deleted user with id: ' + id);
    } catch (error: any) {
      console.error({error});
      return res.status(error?.response?.status ?? 500).json({error});
    }
  };
  
  export default userHandler;