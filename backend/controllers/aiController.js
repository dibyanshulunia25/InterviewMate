const { GoogleGenAI } = require("@google/genai");
const { conceptExplainPrompt, questionAnswerPrompt } = require("../utils/prompts");

const ai = new GoogleGenAI({
    apikey: process.env.GEMINI_API_KEY,
});

//@desc Generate interview questions and anwers using gemini
//@route POST /api/ai/generate-questions
//@access Private
exports.generateInterviewQuestions = async (req, res) => {
    try {
        const { role, experience, topicsToFocus, numberOfQuestions } = req.body;

        if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const prompt = questionAnswerPrompt(role, experience, topicsToFocus, numberOfQuestions);

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-lite",
            contents: prompt,
        });

        let rawText = response.text;

        //cleaning response text
        const cleanedText = rawText
            .replace(/^```json\s*/, "") //remove starting ```json
            .replace(/```$/, "") //remove ending ```
            .replace(/\\n/g, "")
            .replace(/\*\**/g, "")
            .trim(); //remove leading and trailing whitespace

        //parsing response text
        const data = JSON.parse(cleanedText);

        res.status(200).json(data);

    } catch (error) {
        res.status(500).json({ message: "Failed to generate questions", error: error.message });
    }
};

//@desc Generate concept explaination using gemini
//@route POST /api/ai/generate-explaination
//@access Private
exports.generateConceptExplaination = async (req, res) => {
    try {
        const { question } = req.body;

        if (!question) {
            return res.status(400).json({ message: "Question is required" });
        }

        const prompt = conceptExplainPrompt(question);

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-lite",
            contents: prompt,
        });

        let rawText = response.text;

        //cleaning response text
        const cleanedText = rawText
            .replace(/^```json\s*/, "") //remove starting ```json
            .replace(/```$/, "") //remove ending ```
            .replace(/\\n/g, "")
            .replace(/\*\**/g, "") //remove new lines
            .trim(); //remove leading and trailing whitespace

        //parsing response text
        const data = JSON.parse(cleanedText);

        res.status(200).json(data);

    } catch (error) {
        res.status(500).json({ message: "Failed to generate explaination", error: error.message });
    }
};