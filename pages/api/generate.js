import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix = `
List 25 words that are associated with a person's lexicon.

Person:
`;
const generateAction = async (req, res) => {
  const baseCompletion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${basePromptPrefix}${req.body.userInput}`,
    temperature: 0.7,
    max_tokens: 1250,
  });
  const basePromptOutput = baseCompletion.data.choices.pop();
  const secondPrompt = `
  Write a rap in the style of a person. Incorporate some of the words listed below. The rap must rhyme and have clever wordplay and punchlines. Make sure to include personal details about the person.

  Person: ${req.body.userInput}
  
  Words: ${basePromptOutput.text}

  Rap:
  `;
  const secondPromptCompletion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${secondPrompt}`,
    temperature: 0.85,
    max_tokens: 1250,
  });
  const secondPromptOutput = secondPromptCompletion.data.choices.pop();
  res.status(200).json({ output: secondPromptOutput });
};

export default generateAction;
