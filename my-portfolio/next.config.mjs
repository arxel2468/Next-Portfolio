/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
    	domains: ['substackcdn.com'], // Add the domain here
  	},
  	output: 'export', // Enable static export for GitHub Pages
  	trailingSlash: true, 
};

export default nextConfig;
