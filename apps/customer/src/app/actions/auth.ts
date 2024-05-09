"use server"
import { CreateUserSchema } from '@qt/validators';

import { z } from "zod";
import { createClient } from '~/utils/server';

export async function createUser(values:z.infer<typeof CreateUserSchema>) {
    const supabase = createClient();
    const response = await supabase.auth.signUp({
        email: values.email,
        password: values.password,    
    })
    return response;
}

export async function signIn(values:z.infer<typeof CreateUserSchema>) {
    const supabase = createClient();
    const response = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,   
        options: {
            
        }
    })
    return response;
}