import { AuthService } from "./auth.service";
import { NextFunction, Request, Response } from "express";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  register = async (req: Request, res: Response, next: NextFunction) => {
    console.log("CONTROLLER REACHED");
    try {
      const { name, email, password } = req.body;

      const user = await this.authService.register(name, email, password);

      return res.status(201).json({
        success: true,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  };
}
