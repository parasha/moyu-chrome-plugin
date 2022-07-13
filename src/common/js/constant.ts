// export const isDev = import.meta.env.MODE === 'development'
export const isDev = ENV === 'development';

export const API_DOMAIN = ENV ? '/biquge-api' : 'https://www.shuquge.com';
