/* @flow */

import Client from '../index';

class TestFactory {
  requests: Array<Request>;

  constructor(requests: Array<Request>) {
    this.requests = requests;
  }

  // eslint-disable-next-line class-methods-use-this
  makeRequest(url: string, method?: string, body?: Object): Request {
    return new Request(url, { method, body: JSON.stringify(body) });
  }

  executeRequest(request: Request): Promise<*> {
    this.requests.push(request);
    switch (request.method) {
      case 'GET':
      case 'HEAD':
      case 'DELETE':
        return Promise.resolve(
          new Response(JSON.stringify({}), {
            status: 200,
            headers: new Headers({ 'Content-Type': 'application/json' }),
          }),
        );
      default:
        return request.json().then(
          json =>
            new Response(JSON.stringify(json), {
              status: 200,
              headers: new Headers({ 'Content-Type': 'application/json' }),
            }),
        );
    }
  }
}

const makeClient = (factory: TestFactory) =>
  new Client(
    {
      baseURL: 'http://localhost:4001',
      version: 'beta',
    },
    factory,
  );

describe('#Client', () => {
  it('return a new instance with the correct defaults', () => {
    const client = Client.create('token value');
    expect(client.version).toBe('beta');
  });

  describe('.listProjects', () => {
    it('returns a list of projects with a clubhouse account', async () => {
      const requests = [];
      const client = makeClient(new TestFactory(requests));

      await client.listProjects();

      expect(requests).toMatchSnapshot();
    });
  });

  describe('.getProject', () => {
    it('requests a single project', async () => {
      const requests = [];
      const client = makeClient(new TestFactory(requests));

      await client.getProject(1234);

      expect(requests).toMatchSnapshot();
    });
  });

  describe('.createProject', () => {
    it('creates a new project', async () => {
      const requests = [];
      const client = makeClient(new TestFactory(requests));

      await client.createProject({ name: 'test' });

      expect(requests).toMatchSnapshot();
    });
  });

  describe('.updateProject', () => {
    it('updates a existing project', async () => {
      const requests = [];
      const client = makeClient(new TestFactory(requests));

      await client.updateProject(12, { name: 'test' });

      expect(requests).toMatchSnapshot();
    });
  });

  describe('.deleteProject', () => {
    it('deletes a existing project', async () => {
      const requests = [];
      const client = makeClient(new TestFactory(requests));

      await client.deleteProject(1);

      expect(requests).toMatchSnapshot();
    });
  });
});
