// next.config.js
module.exports = {
  async rewrites() {
    return [
      {
        source: "/:postRoute*.html",
        destination: "/:postRoute*",
      },
    ];
  },
  images: {
    domains: [
      "szhshp.org",
      "titan.szhshp.org",
      "i.picsum.photos",
      "i.imgur.com",
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader",
    });
    return config;
  },
};
