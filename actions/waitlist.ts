'use server'

import { z } from 'zod'

// Define the validation schema
const schema = z.object({
  fullname: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
})

// Define the server action
export const addToWaitlist = async (formData: FormData) => {
  // Validate input
  const validatedFields = schema.safeParse({
    fullname: formData.get('fullname'),
    email: formData.get('email'),
  })

  // Return errors if validation fails
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  // Simulate a network delay
  await new Promise(resolve => setTimeout(resolve, 1000))

  // Return success response
  return { success: true, message: "You've been added to the waitlist!" }
}
