import { db } from '@/drizzle/db'
import { Suspense } from 'react'
import { ShowForm } from '../components/show-form';

export function AddStudentPage() {

    return (
        <div>
            <Suspense fallback={<div>Pending...</div>}>
                <AddStudent />
            </Suspense>
        </div>
    )
}

async function AddStudent() {
    const form = await db.query.forms.findFirst({ where: { slug: "Dummy-Form" }, with: { versions: true } });
    return <div>
        {form && <ShowForm form={form.versions[0].schema} formVersionId={form.versions[0].id} />}
    </div>
}