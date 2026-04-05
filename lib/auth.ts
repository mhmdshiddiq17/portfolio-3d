import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from './prisma'
import bcrypt from 'bcryptjs'
import { Adapter } from 'next-auth/adapters'

// Custom adapter untuk SQLite
function CustomPrismaAdapter(): Adapter {
  return {
    createUser: async (user) => {
      const newUser = await prisma.user.create({
        data: {
          email: user.email,
          name: user.name,
          image: user.image,
        },
      })
      return {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        image: newUser.image,
      }
    },
    getUser: async (id) => {
      const user = await prisma.user.findUnique({
        where: { id },
      })
      if (!user) return null
      return {
        id: user.id,
        email: user.email,
        name: user.name,
        image: user.image,
      }
    },
    getUserByEmail: async (email) => {
      const user = await prisma.user.findUnique({
        where: { email },
      })
      if (!user) return null
      return {
        id: user.id,
        email: user.email,
        name: user.name,
        image: user.image,
      }
    },
    createSession: async (data) => {
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
    getSessionAndUser: async (sessionToken) => {
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
          email: session.user.email,
          name: session.user.name,
          image: session.user.image,
        },
      }
    },
    updateUser: async (user) => {
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
        email: updatedUser.email,
        name: updatedUser.name,
        image: updatedUser.image,
      }
    },
    updateSession: async (data) => {
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
    deleteSession: async (sessionToken) => {
      await prisma.session.delete({
        where: { sessionToken },
      })
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

        if (!user) {
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
        token.role = (user as any).role
        token.email = user.email
      }
      return token
    },
    async session({ session, token }) {
      if (session.user && token) {
        (session.user as any).id = token.id as string
        (session.user as any).role = token.role as string
        session.user.email = token.email as string
      }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}
