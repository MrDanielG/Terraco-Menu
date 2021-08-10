module.exports = {
    reactStrictMode: true,
    i18n: {
        locales: ['es-MX', 'en-US'],
        defaultLocale: 'es-MX',
        localeDetection: false, // TODO: Remove this in production
    },
    images: {
        domains: [
            'storage.googleapis.com',
            'images.unsplash.com',
            'storage.cloud.google.com',
            'api.cloudinary.com',
            'res.cloudinary.com',
        ],
    },
};
