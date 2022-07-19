// export const isDev = import.meta.env.MODE === 'development'
export const isDev = ENV === 'development';

export const API_DOMAIN = isDev ? '/biquge-api' : 'https://www.shuquge.com';
