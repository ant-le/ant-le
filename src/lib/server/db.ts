import { env } from '$env/dynamic/private'
import postgres from 'postgres'

let client: ReturnType<typeof postgres> | undefined

export function database() {
    client ??= postgres({
        host: env.PGHOST,
        port: Number(env.PGPORT || 5432),
        database: env.PGDATABASE,
        username: env.PGUSER,
        password: env.PGPASSWORD,
        max: 5,
        idle_timeout: 20,
        connect_timeout: 5,
        connection: {
            application_name: 'ant-le',
            statement_timeout: 5_000,
        },
        onnotice: () => undefined,
    })

    return client
}
