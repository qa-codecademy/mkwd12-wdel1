export { default } from 'next-auth/middleware';

// Middleware is used to protect routes that are not authenticated

export const config = {
	// These are the paths that are protected
	matcher: ['/feed/:path*', '/explore', '/messages', '/:path*/edit'],
};
