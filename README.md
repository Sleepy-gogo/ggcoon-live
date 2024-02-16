<h1 align="center">GGCoon.live<img alt="Comet" src="https://fonts.gstatic.com/s/e/notoemoji/latest/2604_fe0f/512.webp" width="40"></h1>

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

## 📌 What is GGCoon.live?

This is a simple Twitch Clone, made for learning purposes. Feel free to fork this repo, and add your own features, or just use it as a starter for your own project.

## ⚙ How to use it?

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) (Or any other package manager of your liking)
- [Prisma CLI](https://www.prisma.io/docs/orm/tools/prisma-cli#installation)

And that you have an account on:

- [Clerk](https://clerk.com/)
- [LiveKit](https://livekit.io/)
- [Uploadthing](https://uploadthing.com/)

### Installation

1. Clone the repository and install the dependencies:

```bash
git clone https://github.com/Sleepy-gogo/ggcoon-live.git

cd ggcoon-live

npm install # (Or any other package manager equivalent command)
```

2. Setup your environment:

- Copy the example environment file:

```bash
cp .env.example .env
```

- Update the file with your own values.

#### Clerk

Clerk has a quick **Next.js** setup to get your _public_ and _secret keys_.

When creating the **Clerk Webhook**, make sure you point to the right endpoint, _https://yourdomain.com/api/webhooks/clerk_, as well as listen **only** to _user events_.

#### Livekit

You can also generate your _API keys_ in the settings tab on **Livekit**. Follow the indicated format in the example for the wss and api url.

**Livekit** is fully open-source, and allows for self-hosting. See the [livekit.io](https://docs.livekit.io/realtime/self-hosting/) documentation for more information.

#### Uploadthing

Create your app in [Uploadthing](https://uploadthing.com/), then go to the **API Keys** tab, and copy your secret and app ip onto the .env file.

3. Ensure you have the Prisma CLI installed, run the migrations, then generate the prisma client:

```bash
npm install prisma -g

npx prisma migrate dev

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
- Following Users
- Blocking Users
- Dashboard for creators
- Streaming
- Chat
- Community tab on chat panel
- Customizable stream info

## 📝 Planned Additions

- Profile Page
- Searching users
- Unblocking page
