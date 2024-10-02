/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
    	domains: ['substackcdn.com'], // Add the domain here
    	unoptimized: true,
  	},
  	assetPrefix: './',
};

export default nextConfig;
