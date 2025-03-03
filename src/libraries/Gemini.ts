import { GoogleGenerativeAI } from '@google/generative-ai'

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_KEY || ''
export const GeminiClient = new GoogleGenerativeAI(API_KEY)
