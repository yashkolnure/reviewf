const { OpenAI } = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

exports.generateReply = async (req, res) => {
  const { reviewText, rating, businessName } = req.body;

  try {
    const prompt = `You are an AI assistant for ${businessName}. 
    Write a professional, friendly response to this ${rating}-star review: "${reviewText}". 
    Keep it concise and personalized.`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo", // or "gpt-4-turbo"
    });

    res.json({ reply: completion.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ error: "AI Generation failed" });
  }
};