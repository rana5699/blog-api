import { Response } from 'express';

// Define responseHandelar for global respose
const responseHandelar = <T>(
  res: Response,
  statusCode: number,
  success: boolean,
  message: string,
  data: T | null,
) => {
  res.status(statusCode).json({
    success,
    message,
    statusCode,
    data,
  });
};

export default responseHandelar;
