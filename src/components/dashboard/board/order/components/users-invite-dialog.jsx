import {
  getFormProps,
  getInputProps,
  getTextareaProps,
  useForm,
} from '@conform-to/react'
import { getZodConstraint, parseWithZod } from '@conform-to/zod'
import { IconMailPlus, IconSend } from '@tabler/icons-react'
import { Form, useNavigation } from 'react-router'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { formSchema } from '../route'

export function UsersInviteDialog({ open, onOpenChange }) {
  const [form, fields] = useForm({
    defaultValue: { email: '', role: '', desc: '' },
    onValidate: ({ formData }) =>
      parseWithZod(formData, { schema: formSchema }),
    constraint: getZodConstraint(formSchema),
  })
  const navigation = useNavigation()

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        form.reset()
        onOpenChange(state)
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-left">
          <DialogTitle className="flex items-center gap-2">
            <IconMailPlus /> Order Summary
            <div>

            <Button>Use Coupon</Button>
            <Button>x</Button>
            </div>
          </DialogTitle>
         
        </DialogHeader>
   <div className='flex justify-between border-b-2'>
    <p>Proudct Total</p>
    <p>124.50</p>
   </div>
   <div className='flex justify-between border-b-2'>
    <p> Vat</p>
    <p>12.250</p>
   </div>

   <div className='flex justify-between border-b-2'>
    <p> Total</p>
    <p>$112.20</p>
   </div>
   <div className="space-y-1">
            <Label htmlFor={fields.role.id}>Select Payment Method</Label>
            <Select
             
            >
        
              <SelectContent>
                <SelectItem value="superadmin">Commercial Bank of Ethiopia</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="cashier">Cashier</SelectItem>
              </SelectContent>
            </Select>


            <Label htmlFor={fields.role.id}>Account number</Label>
          </div>


     
        <DialogFooter className="gap-y-2">
        
          <Button
            
          >
            Finish <IconSend />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
