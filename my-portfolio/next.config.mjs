/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
	  domains: ['substackcdn.com'],
	  unoptimized: true,
	},
	output: 'export', // For static site generation
	// Remove the assetPrefix or use a proper URL format
	// assetPrefix: './',
	trailingSlash: true,
  };
  
  export default nextConfig;