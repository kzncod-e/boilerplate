import colors from 'tailwindcss/colors';

export const PLATFORMS = [
  'twitter',
  'x',
  'instagram',
  'facebook',
  'youtube',
  'tiktok',
  'telegram',
  'darkweb',
  'news',
  'whatsapp',
  'github',
] as const;
export const SOCMED_PLATFORMS = PLATFORMS.filter((platform) => platform !== 'news');

export type Platform = (typeof PLATFORMS)[number];
export type SocmedPlatform = (typeof SOCMED_PLATFORMS)[number];

export const PLATFORM_HEX_COLOR: Record<Platform | string, string> = {
  twitter: colors.sky[400],
  darkweb: colors.gray[600],
  github: colors.gray[700],
  instagram: colors.pink[500],
  facebook: colors.blue[500],
  youtube: colors.red[400],
  tiktok: colors.gray[500],
  telegram: colors.blue[400],
  whatsapp: colors.green[500],
  x: colors.gray[600],
  news: colors.gray[400],
};
