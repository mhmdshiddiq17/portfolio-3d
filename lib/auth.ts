import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from './prisma'
import bcrypt from 'bcryptjs'
import { Adapter } from 'next-auth/adapters'

// Custom adapter untuk SQLite
function CustomPrismaAdapter(): Adapter {
  return {
    async createUser(user: any) {
      const newUser = await prisma.user.create({
        data: {
          email: user.email,
          name: user.name,
          image: user.image,
          password: user.password || '',
        },
      })
      return {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        image: newUser.image,
        emailVerified: null,
        role: newUser.role || '',
      }
    },
    async getUser(id: string) {
      const user = await prisma.user.findUnique({
        where: { id },
      })
      if (!user) return null
      return {
        id: user.id,
        email: user.email || '',
        name: user.name,
        image: user.image,
        emailVerified: null,
        role: user.role || '',
      }
    },
    async getUserByEmail(email: string) {
      const user = await prisma.user.findUnique({
        where: { email },
      })
      if (!user) return null
      return {
        id: user.id,
        email: user.email || '',
        name: user.name,
        image: user.image,
        emailVerified: null,
        role: user.role || '',
      }
    },
    async createSession(data: any) {
      const session = await prisma.session.create({
        data: {
          sessionToken: data.sessionToken,
          userId: data.userId,
          expires: data.expires,
        },
      })
      return {
        sessionToken: session.sessionToken,
        userId: session.userId,
        expires: session.expires,
      }
    },
    async getSessionAndUser(sessionToken: string) {
      const session = await prisma.session.findUnique({
        where: { sessionToken },
        include: { user: true },
      })
      if (!session) return null
      return {
        session: {
          sessionToken: session.sessionToken,
          userId: session.userId,
          expires: session.expires,
        },
        user: {
          id: session.user.id,
          email: session.user.email || '',
          name: session.user.name,
          image: session.user.image,
          emailVerified: null,
          role: session.user.role || '',
        },
      }
    },
    async updateUser(user: any) {
      const updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: {
          email: user.email,
          name: user.name,
          image: user.image,
        },
      })
      return {
        id: updatedUser.id,
        email: updatedUser.email || '',
        name: updatedUser.name,
        image: updatedUser.image,
        emailVerified: null,
        role: updatedUser.role || '',
      }
    },
    async updateSession(data: any) {
      const session = await prisma.session.update({
        where: { sessionToken: data.sessionToken },
        data: {
          expires: data.expires,
        },
      })
      return {
        sessionToken: session.sessionToken,
        userId: session.userId,
        expires: session.expires,
      }
    },
    async deleteSession(sessionToken: string) {
      await prisma.session.delete({
        where: { sessionToken },
      })
    },
    async linkAccount() {
      return
    },
    async getUserByAccount() {
      return null
    },
  }
}

export const authOptions: NextAuthOptions = {
  adapter: CustomPrismaAdapter(),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email dan password diperlukan')
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })

        if (!user?.password) {
          throw new Error('User tidak ditemukan')
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!isPasswordValid) {
          throw new Error('Password salah')
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          role: user.role,
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/admin-login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
        token.email = user.email
      }
      return token
    },
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id
        session.user.role = token.role
        session.user.email = token.email || session.user.email
      }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}
