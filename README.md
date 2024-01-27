<h1 align="center">GGCoon.TV<img alt="Comet" src="https://fonts.gstatic.com/s/e/notoemoji/latest/2604_fe0f/512.webp" width="40"></h1>

<p align="center">
  <b>Built using:</b><br/>
  <img alt="Next JS" src="https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white">
  <img alt="TypeScript" src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white">
  <img alt="TailwindCSS" src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white">
  <img alt="Prisma" src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white">
  <img alt="Supabase" src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white">
  <img alt="Bun" src="https://img.shields.io/badge/Bun-%23000000.svg?style=for-the-badge&logo=bun&logoColor=white"><br/>
  As well as <b>Clerk</b> for authentication,<br/>
  <b>Zustand</b> for state management, and<br/>
  <b>shadcn/ui</b> components
</p>

<p align="center">
  
</p>

## 📌 What is GGCoon.TV?

This is a simple Twitch Clone, made for learning purposes. Feel free to fork this repo, and add your own features, or just use it as a starter for your own project.

## ⚙ How to use it?

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) (Or any other package manager of your liking)
- [Prisma CLI](https://www.prisma.io/docs/orm/tools/prisma-cli#installation)

And that you have a Clerk account.

- [Clerk](https://clerk.com/)

### Installation

1. Clone the repository and install the dependencies:

```bash
git clone https://github.com/Sleepy-gogo/ggcoon-tv.git

cd ggcoon-tv

npm install # (Or any other package manager equivalent command)
```

2. Setup your environment:

- Copy the example environment file:

```bash
cp .env.example .env
```

- Update the file with your own values.

```bash
# Clerk credentials
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_public_key_here
CLERK_SECRET_KEY=your_secret_key_here
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in #Keep this the same
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up #Keep this the same
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/ #Keep this the same
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/ #Keep this the same
CLERK_WEBHOOK_SECRET=your_webhook_secret_here

# Database credentials
DATABASE_URL=your_database_url_here # Make sure to update the prisma schema if yours isn't postgres.
DIRECT_URL=your_direct_url_here
```

> Clerk has a quick Next.js setup to get your public and secret keys.

> When creating the Clerk Webhook, make sure you point to the right endpoint, https:yourdomain.com/api/webhooks/clerk, as well as listen to the user events.

3. Ensure you have the Prisma CLI installed, run the migrations, then generate the prisma client:

```bash
npm install prisma -g

npx prisma migrate dev # or `npx prisma migrate deploy` if you're in production

npx prisma generate
```

### Usage

You can run the development server normally by running:

```bash
npm run dev
```

Or start the production server by running:

```bash
npm run start
```

## 🍁 Features

- Authentication
- User Profiles

## 📝 Planned Additions

- Streaming
- Chat
- Profile Page
- Blocking Users
