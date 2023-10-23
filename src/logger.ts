import { Logger, z } from '@imlunahey/logger';

export const logger = new Logger({
  service: 'blog',
  schema: {
    info: {
      'Web server started': z.object({
        port: z.number(),
      }),
      'Web server stopping': z.object({}),
      'Web server stopped': z.object({}),
    },
    debug: {
      'Loading posts': z.object({
        count: z.number(),
      }),
      'Loaded post': z.object({
        path: z.string(),
        slug: z.string(),
      }),
      'Loaded posts': z.object({
        count: z.number(),
      }),
      'Registered routes': z.object({
        routes: z.array(
          z.object({
            method: z.string(),
            path: z.string(),
          }),
        ),
      }),
    },
  },
});
