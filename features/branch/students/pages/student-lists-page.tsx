

import { db } from '@/drizzle/db';
import { Suspense } from 'react';

export function StudentListsPage() {

    return (
        <div>
            <Suspense fallback={<div>Pending...</div>}>
                <StudentLists />
            </Suspense>
        </div>
    )
}

async function StudentLists() {
    const form = await db.query.forms.findFirst({ where: { slug: "Dummy-Form" }, with: { versions: { with: { submissions: true } } } });
    return <div>
        {form?.versions[0].submissions.map((data) => (
            <div key={data.id}>{JSON.stringify(data.data)}</div>
        ))}
    </div>
}