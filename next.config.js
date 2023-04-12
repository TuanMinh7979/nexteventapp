/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BASE_URL: "http://localhost:3000",
    MONGODB_URL:
      "mongodb+srv://tuan:12345678Abc@cluster0.h8bya9k.mongodb.net/todo",

    ACCESS_TOKEN_SECRET: "abc1",
    REFRESH_TOKEN_SECRET: "abc2",
  },
};

module.exports = nextConfig;
