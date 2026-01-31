import axios from 'axios';

export const generateImageWithClipdrop = async (
  prompt: string
): Promise<Buffer> => {
  try {
    const payload: any = { prompt };

    const response = await axios.post(
      'https://clipdrop-api.co/text-to-image/v1',
      payload,
      {
        headers: {
          'x-api-key': process.env.CLIPDROP_API_KEY!,
        },
        responseType: 'arraybuffer',
      }
    );

    return Buffer.from(response.data);
  } catch (error: any) {
    // Surface API error body for easier debugging
    if (error?.response?.data) {
      try {
        const body = Buffer.from(error.response.data).toString('utf8');
        console.error('[Clipdrop API Error]', body);
      } catch (e) {
        console.error('[Clipdrop API Error] unable to parse response body');
      }
    }

    throw error;
  }
};
