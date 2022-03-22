module.exports = {
  async redirects() {
    return [
      {
        source: "/playground",
        destination: "/exercise-4",
        permanent: false,
      },
    ];
  },
};
