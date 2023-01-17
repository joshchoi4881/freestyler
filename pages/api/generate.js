import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const generate = async (req, res) => {
  const firstPrompt = `
    List 25 words that are associated with a person's lexicon.

    Person: ${req.body.input}
    `;
  const firstPromptCompletion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${firstPrompt}`,
    temperature: 0.7,
    max_tokens: 1250,
  });
  const firstPromptOutput = firstPromptCompletion.data.choices.pop();
  const secondPrompt = `
    Write a rap in the style of a person. Incorporate some of the words listed below. The rap must rhyme and have clever wordplay and punchlines. Make sure to include personal details about the person.

    Person: ${req.body.input}

    Words: ${firstPromptOutput.text}

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

export default generate;
