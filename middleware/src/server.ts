import fastify, { FastifyError, FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
const projectData = require('../../package.json');
import cors from '@fastify/cors';
import * as dotenv from 'dotenv';
import { User } from './types/User';
import { Neo4jError, QueryResult, Result, Session } from 'neo4j-driver';

const neo4j = require('neo4j-driver');

dotenv.config();

const driver = neo4j.driver(process.env.NEO4J_URL, neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD));

const server: FastifyInstance = fastify();

server.register(cors, {
  origin: ['http://localhost:3000', 'http://localhost:8080'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Access-Control-Allow-Origin'],
})

server.get('/api/version', async () => {
  return projectData.version;
});

const verifyAuthToken = (
  request: FastifyRequest<{ Body: { authToken: string }; }>,
  _reply: FastifyReply,
  done: (err?: FastifyError) => void
) => {
  var session: Session = driver.session()
  session.run('MATCH (u:User { authToken: $authToken}) return u', {
    authToken: request.body.authToken
  })
  .then((result: QueryResult) => {
    if(!result.records.length) done({ code: '500', name: 'INVALID_AUTH_TOKEN', message: 'unauthorized' });
    done();
  })
  .catch((error: Neo4jError) => {
    done(error);
  })
  .then(() => session.close())
};

server.route({
  method: 'POST',
  url: '/verify',
  preHandler: verifyAuthToken,
  handler: (req, reply) => { reply.send('verified') }
})

const start = async () => {
  try {
      await driver.supportsUserImpersonation().then((res: boolean) =>{ if(res)console.log(`Connected to Neo4j database at: ${process.env.NEO4J_URL}`)});
      await server.listen({ port: 8080 }, (_err: Error | null, address: string) => {
        console.log(`Server listening at ${address}`)
      })
  } catch (err) {
      server.log.error(err);
      process.exit(1);
  }
};
start();