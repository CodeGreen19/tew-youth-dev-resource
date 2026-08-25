// lib/cache/cached-query.ts

import { cache } from 'react'
import { unstable_cache } from 'next/cache'

type CachedQueryOptions = {
    revalidate?: number | false
    tags?: string[]
}

export function cachedQuery<
    Args extends unknown[],
    Result,
>(
    fn: (...args: Args) => Promise<Result>,
    keyParts: string[],
    options?: CachedQueryOptions,
) {
    const persistentCache = unstable_cache(
        fn,
        keyParts,
        options,
    )

    return cache((...args: Args) => persistentCache(...args))
}