import { VertexAI } from '@google-cloud/vertexai';

const vertexAI = new VertexAI({
  project: process.env.GCP_PROJECT_ID!,
  location: process.env.GCP_LOCATION!, 
});

const imagenModel = vertexAI.getGenerativeModel({
  model: 'imagegeneration@006',
});

export const generateImageWithImagen = async (
  prompt: string
): Promise<Buffer> => {
  const parts: any[] = [{ text: prompt }];

  const result = await imagenModel.generateContent({
    contents: [
      {
        role: 'user',
        parts,
      },
    ],
  });

  const imageBase64 =
    result.response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

  if (!imageBase64) {
    throw new Error('Imagen returned no image data');
  }

  return Buffer.from(imageBase64, 'base64');
};
