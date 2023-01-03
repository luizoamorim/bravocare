# To execute the project

## 1 - Up postgres: RUN

```
docker-compose up -d
```

## 2 - Create the .env file

```
DATABASE_URL="postgresql://postgres:p0stgr35!@localhost:5432/bravocare?schema=public"
```

## 3 - Up the fastify server: RUN

```
npm install
npm run dev
```
