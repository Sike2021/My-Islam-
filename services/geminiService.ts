
import { GoogleGenAI, Type } from "@google/genai";
import { ProjectFile } from "../types";

// Always use a named parameter for apiKey and obtain it from process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function analyzeProject(files: ProjectFile[]): Promise<string> {
  const fileContext = files
    .filter(f => f.type === 'file' && (f.name.endsWith('.tsx') || f.name.endsWith('.ts') || f.name.endsWith('.js')))
    .slice(0, 10) // Limit context for basic analysis
    .map(f => `File: ${f.path}\nContent:\n${f.content.substring(0, 1000)}`)
    .join('\n\n---\n\n');

  // Use 'gemini-3-pro-preview' for complex text tasks like coding and architecture analysis
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `You are a senior React engineer. Analyze this partial codebase and provide a summary of the architecture, key components, and potential improvements for a modern migration.
    
    Codebase Context:
    ${fileContext}`,
    config: {
      temperature: 0.7,
      topP: 0.95,
      maxOutputTokens: 2000,
    }
  });

  // Access the generated text directly using the .text property
  return response.text || "No analysis available.";
}

export async function explainFile(fileName: string, content: string): Promise<string> {
  // Use 'gemini-3-pro-preview' for complex text tasks like code explanation
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Explain what this React file does in simple terms. Suggest 2 improvements.
    
    File: ${fileName}
    Content:
    ${content}`,
    config: {
      temperature: 0.4,
    }
  });

  // Access the generated text directly using the .text property
  return response.text || "No explanation generated.";
}
