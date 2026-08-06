import bycript from "bcrypt";
import { AuthRepository } from "./auth.repository";

export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  async register(name: string, email: string, password: string) {
    const existingUser = await this.authRepository.findByEmail(email);

    if (existingUser) {
      throw new Error("Email already exists.");
    }

    const passwordHash = await bycript.hash(password, 10);

    return this.authRepository.create({
      name,
      email,
      passwordHash,
    });
  }
}
