"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Image from "next/image"
import { Button } from "@/components/ui/button"

import { Form } from "@/components/ui/form";
// import { signIn, signUp } from "@/lib/actions/auth.action";
// import FormField from "./FormField";
import { toast } from "sonner"

const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(8),
  })
}

const AuthForm = ({type}:{type: FormType}) => {
  const formSchema = authFormSchema(type)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })
 
  function onSubmit(values: z.infer<typeof formSchema>) {
    try{
      if(type === "sign-up"){
        console.log("SIGN UP", values)
      } else {
        console.log("SIGN IN", values)
      }

    } catch (error) {
      console.log(error)
      toast.error("Something went wrong `${error}`")
    }
  }
const isSignIn = type === "sign-in"


  return (
    <div className="card-border lg:min-w-[566px]:">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image src="/logo.svg" alt="logo" width={38} height={32} />
          <h2 className="text-primary-100">Prepwise</h2>
        </div>
          <h3>Pracrice Job Interviews with AI</h3>
      
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-4 form">
            {!isSignIn && <p>Name</p>}
            <p>Email</p>
            <p>Password</p>
            
            <Button  className= "btn" 
            type="submit">{isSignIn ? "Sign In" : "Create an Account"}</Button>
          </form>
        </Form>
        <p className="text-center">
          {isSignIn ? "Don't have an account?" : "Already have an account"}
          <Link href={!isSignIn ? '/sign-in' : '/sign-up'}className="font-bold text-user-primary ml-1">
            {!isSignIn ? 'Sign In' : 'Sign Up'}
          </Link>
        </p>

      </div>
    </div>
  )
}

export default AuthForm