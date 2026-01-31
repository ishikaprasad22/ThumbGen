import { Request, Response, NextFunction } from 'express';

const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('[Auth] Full session:', {
    sessionExists: !!req.session,
    sessionId: (req.session as any)?.id,
    isLoggedIn: (req.session as any)?.isLoggedIn,
    userId: (req.session as any)?.userId,
  });
  
  const { isLoggedIn, userId } = req.session as {
    isLoggedIn?: boolean;
    userId?: string;
  };

  if (!isLoggedIn || !userId) {
    console.log('[Auth] BLOCKED - no isLoggedIn or userId');
    return res.status(401).json({
      message: 'You are not logged in',
    });
  }

  console.log('[Auth]  PASSED for userId:', userId);
  next();
};

export default protect;