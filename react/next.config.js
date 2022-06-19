/* eslint-disable */
module.exports = {
  webpack: (config) => {
    // Turn off symlink resolving so that shared code can be used among the
    // different platforms used for the portfolio.
    config.resolve.symlinks = false;
    return config;
  },
};
