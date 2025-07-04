import { GoogleGenAI } from "@google/genai";
import { useState } from "react";

const ai = new GoogleGenAI({
    apiKey: process.env.REACT_APP_GEMINI_API_KEY
});

function useAIChatWithGemini() {
    const [isLoading, setIsLoading] = useState(false);

    const handleAIChatWithGemini = async (input) => {
        console.log(input);
        try {
            setIsLoading(true);
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash-lite-preview-06-17",
                contents: input,
            });

            return response.text;
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    return { isLoading, mutateAsync: handleAIChatWithGemini };
}

export default useAIChatWithGemini;