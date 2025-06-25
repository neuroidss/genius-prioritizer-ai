
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { Task } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("API_KEY environment variable not set. Gemini API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const prioritizeTasksWithGemini = async (tasks: Task[], userContext: string, modelName: string): Promise<string> => {
  if (!API_KEY) {
    throw new Error("Gemini API key is not configured. Please set the API_KEY environment variable.");
  }

  const taskListString = tasks.map(task => `- ${task.text.trim()}`).join('\n');

  const contextPromptSection = userContext.trim() 
    ? `
The user has provided the following personal context to help define what 'genius' or 'high impact' means to them:
--- USER CONTEXT ---
${userContext.trim()}
--- END USER CONTEXT ---
Please consider this context deeply when making your recommendation and frame your reasoning in light of it.`
    : "The user has not provided specific personal context. Use general principles of impact and potential.";

  const prompt = `
You are 'Clarity Engine', an advanced AI prioritization assistant. Your purpose is to help users identify the single most impactful task or idea from the list they provide, guiding them toward what truly matters for achieving their goals, even if those goals are unstated. You should sound insightful, slightly philosophical, and highly intelligent.

${contextPromptSection}

Analyze the following tasks/ideas carefully:
${taskListString}

Based on this list ${userContext.trim() ? 'and the user\'s personal context, ' : ''}which ONE item should be the absolute top priority right now? Provide a concise, inspiring explanation for your choice. Your response should start directly with your recommendation. For example: "Your top priority should be: [Task X] because [reasoning]."
Focus on identifying the task that could unlock the most potential, create the most significant positive change, or clear a critical bottleneck, aligning with the user's broader aspirations (if provided).
  `;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        temperature: 0.75, // Slightly more creative if context is given
        topP: 0.9,
        topK: 40,
        // Omit thinkingConfig to use default (enabled) for higher quality.
      }
    });
    
    const textResponse = response.text;
    if (!textResponse) {
        throw new Error("Received an empty response from the AI.");
    }
    return textResponse.trim();

  } catch (error) {
    console.error('Gemini API request failed:', error);
    if (error instanceof Error && error.message.includes('API key not valid')) {
         throw new Error('Invalid API Key. Please check your Gemini API key.');
    }
    throw new Error(`Failed to get prioritization from AI: ${error instanceof Error ? error.message : String(error)}`);
  }
};
