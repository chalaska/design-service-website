import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Debug environment variables
  console.log('NOTION_TOKEN exists:', !!process.env.NOTION_TOKEN);
  console.log('NOTION_DATABASE_ID exists:', !!process.env.NOTION_DATABASE_ID);
  console.log('NOTION_TOKEN preview:', process.env.NOTION_TOKEN?.substring(0, 10) + '...');
  console.log('DATABASE_ID:', process.env.NOTION_DATABASE_ID);

  try {
    console.log('Received request body:', req.body);
    
    // For now, just return the data we received without creating Notion entries
    res.status(200).json({ 
      success: true, 
      message: 'Debug mode - entry would be created',
      data: req.body,
      env_check: {
        token_exists: !!process.env.NOTION_TOKEN,
        db_id_exists: !!process.env.NOTION_DATABASE_ID
      }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to process request' });
  }
}
