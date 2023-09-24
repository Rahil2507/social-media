/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_ZEGO_APP_ID: 378318694,
    NEXT_PUBLIC_ZEGO_SERVER_ID: "6239ad7917c116a3596e5734eed44bc1"
  },
  images: {
    domains: ['localhost'], 
  },
}

module.exports = nextConfig