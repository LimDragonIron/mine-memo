'use client'

import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { Layers2Icon, Loader2 } from 'lucide-react'

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { createMindMapSchema, createMindMapSchemaType } from '@/schema/mindmaps'
import { createMindMap } from '@/actions/mindmaps/CreateMindMap'
import CustomDialogHeader from '@/components/CustomDialogHeader'

export default function CreateMindMapialog({
  triggerText,
}: {
  triggerText?: string
}) {
  const [isOpen, setIsOpen] = useState(false)
  const form = useForm<createMindMapSchemaType>({
    resolver: zodResolver(createMindMapSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  })

  const { mutate, isPending } = useMutation({
    mutationFn: createMindMap,
    onSuccess: () => {
      toast.success('Mindmap created successfully', { id: 'create-mindmap' })
    },
    onError: () => {
      toast.error('Failed to create mindmap', { id: 'create-mindmap' })
    },
  })

  const onSubmit = useCallback(
    (values: createMindMapSchemaType) => {
      toast.loading('Creating mindmap...', { id: 'create-mindmap' })
      mutate(values)
    },
    [mutate]
  )

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        form.reset()
        setIsOpen(open)
      }}
    >
      <DialogTrigger asChild>
        <Button>{triggerText ?? 'Create MindMap'}</Button>
      </DialogTrigger>
      <DialogContent className="px-0">
        <CustomDialogHeader
          icon={Layers2Icon}
          title="Create MindMap"
          subtitle="Start building your MindMap"
        />
        <div className="px-6">
          <Form {...form}>
            <form
              className="space-y-8 w-full"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex gap-1 items-center">
                      Name
                      <p className="text-xs text-primary">(required)</p>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Choose a description and unique name
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex gap-1 items-center">
                      Description
                      <p className="text-xs text-muted-foreground">
                        (optional)
                      </p>
                    </FormLabel>
                    <FormControl>
                      <Textarea className="resize-none" {...field} />
                    </FormControl>
                    <FormDescription>
                      Provide a brief description of what your MindMap does.
                      <br /> This is optional but can help you remember the
                      MindMap&apos;s purpose.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? <Loader2 className="animate-spin" /> : 'Proceed'}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
