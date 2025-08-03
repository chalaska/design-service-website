import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // For now, just return success without actually creating Notion entries
  // We'll add the real Notion integration after the build works
  try {
    console.log('Received data:', req.body);
    
    // Simulate success
    res.status(200).json({ 
      success: true, 
      message: 'Entry would be created',
      data: req.body 
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to process request' });
  }
}
