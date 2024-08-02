import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common'
import { User } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'

@Controller('/accounts')
export class CreateAccountController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @HttpCode(201)
  async handle(@Body() body: any) {
    const { name, email, password } = body

    const usersWithSameEmail = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    console.log('usersWithSameEmail', usersWithSameEmail)

    if (usersWithSameEmail) {
      throw new ConflictException('Email already in use')
    }

    await this.prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    })
  }
}
