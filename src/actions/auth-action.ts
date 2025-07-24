"use server"
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from "@/client/server";
import { SignupFormSchema, SignupFormState, LoginFormSchema, LoginFormState } from "../lib/definitions";

export async function login(state: LoginFormState, formData: FormData): Promise<LoginFormState> {
    const supabase = await createClient()

    const validatedFields = LoginFormSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
    })

    if (!validatedFields.success) {
        return {
          errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    const { data, error } = await supabase.auth.signInWithPassword({
        email: validatedFields.data.email,
        password: validatedFields.data.password,
    })

    if (error) {
        return {
            errors: {
                email: [error.message],
            }
        }
    }

    revalidatePath("/")
    redirect("/dashboard")
}

export async function signup(state: SignupFormState, formData: FormData): Promise<SignupFormState> {
    const supabase = await createClient()
    const validatedFields = SignupFormSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword'),
    })

    if (!validatedFields.success) {
        return {
          errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    const { data, error } = await supabase.auth.signUp({
        email: validatedFields.data.email,
        password: validatedFields.data.password,
    })

    if (error) {
        return {
            errors: {
                email: [error.message],
            }
        }
    }

    revalidatePath("/")
    redirect("/")
}

export async function logout() {
    const supabase = await createClient()
    await supabase.auth.signOut()
    revalidatePath("/")
    redirect("/login")
}