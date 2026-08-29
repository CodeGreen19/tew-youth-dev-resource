
import { Page } from '@/components/shared/page';
import { getQueryClient } from '@/lib/tanstack-query/get-query-client';
import { dehydrate, HydrationBoundary, queryOptions } from '@tanstack/react-query';
import { ShowUsers } from '../components/show-users';
import { UsersHeader } from '../components/users-header';
import { getUsers } from '../server/queries';
import { headers } from 'next/headers';

// export const userOptions = queryOptions({ queryKey: ["users"], queryFn: () => getUsers() })

export async function UsersPage() {
    // const qc = getQueryClient();
    // await qc.prefetchQuery(userOptions)
    const s = performance.now()
    const data = await getUsers(await headers());
    const e = performance.now();
    console.log(`query tooke ${Math.ceil(e - s)} ms`)
    return (
        // <HydrationBoundary state={dehydrate(qc)}>

        <Page>
            <UsersHeader />
            <ShowUsers data={data} />
        </Page>

        // </HydrationBoundary>
    )
}

