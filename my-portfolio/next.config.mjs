// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
	  domains: [
		'substackcdn.com',
		'substack.com',
		'cdn.substack.com',
		'bucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com', // Another common Substack image domain
	  ],
	  unoptimized: true, // Required for static export
	},
	output: 'export', // For static site generation
	trailingSlash: true,
  };
  
  export default nextConfig;