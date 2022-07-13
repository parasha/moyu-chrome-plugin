import { initMessageChannel, ChannelType } from '@/common/js/chrome-message';

export const port = await initMessageChannel(ChannelType.Content);
