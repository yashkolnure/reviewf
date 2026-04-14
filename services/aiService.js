const OpenAI = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const generateReply = async (comment, rating) => {
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: `Reply to this ${rating}-star review: ${comment}` }],
  });
  return response.choices[0].message.content;
};

module.exports = { generateReply };