
import { User } from '@prisma/client';
import * as express from 'express';

/// <reference />
declare global {
  namespace Express {
    interface Request {
      user?: User; // Define your user structure here
    }
  }
}
