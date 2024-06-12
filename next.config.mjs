import path from 'path';
import fs from 'fs';

const theme = process.env.IW_THEME || 'default';

const themePath = path.resolve('src', 'styles', theme);

const config = {
  env: {
    IW_THEME: process.env.IW_THEME,
  },
  webpack: (config, { isServer }) => {
    if (fs.existsSync(themePath)) {
      config.module.rules.push({
        test: /\.css$/,
        include: themePath,
        use: [
          'style-loader',
          'css-loader',
        ],
      });
    }
    return config;
  },
};

export default config;
