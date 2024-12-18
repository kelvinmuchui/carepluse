"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import CustomForm from "../CustomForm"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
export enum FormFieldType{
    INPUT = 'input',
    TEXTAREA = "textarea",
    PHONE_INPUT = "phoneInput",
    CHECKBOX  = 'checkbox',
    DATE_PICKER = "datePicker",
    SELECT = 'select',
    SKELETON ='skeleton',
}
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})
 
const PatientForm = ()=> {
  // 1. Define your form.
  const [isLoading, setIsloading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }
  return(
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-flex-1">
        <section className="mb-12 space-y-4">
            <h1 className="header">Hi there</h1>
            <p className="text-dark-700"> Schedule your first appointment</p>
        </section>
        <CustomForm
            fieldType = {FormFieldType.INPUT}

            control ={form.control}
            name ="name"
            label = "Full Name"
            placeholder = "John Doe"
            iconSrc = "/assets/icons/user.svg"
            iconAlt = "user"
        />
        <CustomForm
            fieldType = {FormFieldType.INPUT}

            control ={form.control}
            name ="email"
            label = "Email"
            placeholder = "johndoe@eamil.com"
            iconSrc = "/assets/icons/email.svg"
            iconAlt = "email"
        />
        <CustomForm
            fieldType = {FormFieldType.PHONE_INPUT}

            control ={form.control}
            name ="Phone"
            label = "Phone Number"
            placeholder = "(254) 123-4567"
            
        />
      <SubmitButton isLoading  ={isLoading}>Get started</SubmitButton>
      </form>
    </Form>
  )
}

export default PatientForm