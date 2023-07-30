import { fetch, Headers, Request, Response } from 'cross-fetch';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

global.fetch = fetch;
global.Headers = Headers;
global.Request = Request;
global.Response = Response;

const server = setupServer(
  rest.get('https://', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({// mockData
    }));
  }),
  rest.get('https://', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({// mockData
    }));
  }),
  rest.get('*', (req, res, ctx) => {
    console.log(`Please add request handler for ${req.url.toString()}`);
    return res(ctx.status(500), ctx.json({ error: 'Please add request handler' }));
  })
);

beforeAll(() => {
  server.listen();
});
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => {
  server.close();
});

export { rest, server };

