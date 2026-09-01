"use client"
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import { Field } from '@/components/ui/field'
import { Dispatch, SetStateAction } from 'react'
import { Course } from '../types'
import { useMutation } from '@tanstack/react-query'
import { deleteCourse } from '../actions'
export default function DeleteCourseDialog({ deleteDialogInfo, setDeleteDialogInfo }: { deleteDialogInfo: Course | null, setDeleteDialogInfo: Dispatch<SetStateAction<Course | null>> }) {

    const mutation = useMutation({ mutationFn: deleteCourse, onSuccess: () => setDeleteDialogInfo(null) })
    return (
        <Dialog open={!!deleteDialogInfo} onOpenChange={(v) => {
            if (!v) {
                setDeleteDialogInfo(null)
            }
        }}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete your course <span className='font-semibold'>{`"${deleteDialogInfo?.name}" `}</span>
                        and remove your data from our servers.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Field className='justify-end' orientation={"horizontal"}>
                        <Button onClick={() => setDeleteDialogInfo(null)} variant={"ghost"}>Cancel</Button>
                        <Button disabled={mutation.isPending} onClick={() => deleteDialogInfo && mutation.mutate(deleteDialogInfo.id)} variant={"destructive"}>Delete Forever</Button>
                    </Field>
                </DialogFooter>
            </DialogContent>

        </Dialog>
    )
}
