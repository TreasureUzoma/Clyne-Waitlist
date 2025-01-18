'use server';

import { z } from 'zod';
import { db } from '@/lib/firebaseConfig';
import { collection, doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';

// Define the validation schema
const schema = z.object({
  fullname: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
});

// Define the server action
export const addToWaitlist = async (formData: FormData) => {
  // Validate input
  const validatedFields = schema.safeParse({
    fullname: formData.get('fullname'),
    email: formData.get('email'),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { fullname, email } = validatedFields.data;

  try {
    // Use the email as the document ID
    const waitlistRef = doc(collection(db, 'clyne-waitlist'), email);

    // Check if the document already exists
    const docSnapshot = await getDoc(waitlistRef);
    if (docSnapshot.exists()) {
      return {
        error: 'This email is already on the waitlist.',
      };
    }

    // Add the document to Firestore
    await setDoc(waitlistRef, {
      fullname,
      email,
      createdAt: serverTimestamp(),
    });

    return { success: true, message: "You've been added to the waitlist!" };
  } catch (error) {
    console.error('Error adding to waitlist:', error);
    return {
      error: 'An error occurred while adding you to the waitlist. Please try again later.',
    };
  }
};
