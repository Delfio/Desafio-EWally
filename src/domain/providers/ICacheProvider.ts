interface ICacheProvider<Request, Response> {
    getCacheByRequest: (request: Request) => Response | null,
    setCache: (request: Request, response: Response) => void
}

export default ICacheProvider;