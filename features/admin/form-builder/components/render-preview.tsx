"use client"
import { Button } from '@/components/ui/button';
import { DynamicForm } from './dymamic-form'
import { FormDefinition } from '@/types/form'
import { Eye } from 'lucide-react';

export function RenderPreview({ definations }: { definations: FormDefinition }) {
    console.log(definations, "defincations");

    return (
        <div className='space-y-3'>
            <div className=' pb-4 gap-1 flex items-center justify-start font-semibold'><span>Form Preview</span> <Eye className='size-5' /></div>
            <DynamicForm definations={definations} />
        </div>
    )
}
