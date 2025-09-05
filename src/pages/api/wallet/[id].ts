import type { NextApiRequest, NextApiResponse } from "next";

type Wallet = {
  id: string;
  balance: number;
  currency: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Wallet | { message: string }>
) {
  const { id } = req.query;

  // Simulate finding a wallet (replace with real DB lookup later)
  if (id === "fefcdf2d-66b8-4a3e-9ed7-f51df1761a38") {
    return res.status(200).json({
      id: id as string,
      balance: 500,
      currency: "USD",
    });
  }

  res.status(404).json({ message: "Wallet not found" });
}
