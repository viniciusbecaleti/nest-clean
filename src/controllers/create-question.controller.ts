import { Controller, Post, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { CurrentUser } from 'src/auth/current-user.decorator'
import { TokenPayloadSchema } from 'src/auth/jwt.strategy'
// import { PrismaService } from 'src/prisma/prisma.service'
// import { z } from 'zod'

// const createQuestionBodySchema = z.object({
//   title: z.string(),
//   content: z.string(),
//   authorId: z.string(),
// })

// type CreateQuestionBodySchema = z.infer<typeof createQuestionBodySchema>

@Controller('/questions')
@UseGuards(AuthGuard('jwt'))
export class CreateQuestionController {
  // constructor(private readonly prisma: PrismaService) {}

  @Post()
  async handle(@CurrentUser() user: TokenPayloadSchema) {
    const { sub: userId } = user

    console.log(userId)

    return 'OK'
  }
}
