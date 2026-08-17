import { Button } from '@/components/ui/button'
import { FormDefinition } from '@/types/form'
import React from 'react'

export function ConfirmBuild({ onCancel, form }: { form: FormDefinition, onCancel: () => void }) {

    // form submission
    return (
        <div className='flex items-center justify-end gap-3'>
            <Button variant={"outline"} onClick={onCancel}>Cancel</Button>
            <Button>Confirm Build</Button>
        </div>
    )
}
