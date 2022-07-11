    import contextRoute from './context'
    import testRoute from './test'

    export default function registerRoutes (server){

        server.register(contextRoute,{ prefix: `/context` })
        server.register(testRoute,{ prefix: `/test` })
    }