import { userRepository } from '@/modules/user/domain/repositories/user-repository.abstract'
import { Prisma, User } from '@prisma/client'
import { randomUUID } from 'node:crypto'

export class UserInMenoryRepository implements userRepository {
  public items: User[] = []

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find(item => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async create(data: Prisma.UserUncheckedCreateInput): Promise<User> {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    }
    this.items.push(user)
    return user
  }
}
