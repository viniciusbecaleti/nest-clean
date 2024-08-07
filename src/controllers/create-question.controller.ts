import { Body, Controller, Post, UseGuards, UsePipes } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { CurrentUser } from '@/auth/current-user.decorator'
import { TokenPayloadSchema } from '@/auth/jwt.strategy'
import { ZodValidationPipe } from '@/pipes/zod-validation-pipe'
import { PrismaService } from '@/prisma/prisma.service'
import { z } from 'zod'

const createQuestionBodySchema = z.object({
  title: z.string(),
  content: z.string(),
})

type CreateQuestionBodySchema = z.infer<typeof createQuestionBodySchema>

@Controller('/questions')
@UseGuards(AuthGuard('jwt'))
export class CreateQuestionController {
  constructor(private readonly prisma: PrismaService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createQuestionBodySchema))
  async handle(
    @Body() body: CreateQuestionBodySchema,
    @CurrentUser() user: TokenPayloadSchema,
  ) {
    const { title, content } = body
    const { sub: userId } = user

    const slug = this.convertToSlug(title)

    const questionWithSameSlug = await this.prisma.question.findUnique({
      where: { slug },
    })

    let newSlug = slug

    if (questionWithSameSlug) {
      newSlug = `${slug}-${Date.now()}`
    }

    await this.prisma.question.create({
      data: {
        title,
        content,
        slug: newSlug,
        authorId: userId,
      },
    })
  }

  convertToSlug(slug: string) {
    return slug
      .toLowerCase()
      .normalize('NFC')
      .replace(/[\u0300-\u036f]/g, '-')
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
  }
}
