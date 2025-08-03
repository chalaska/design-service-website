import { NextApiRequest, NextApiResponse } from 'next';
import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('Starting Notion API call...');
    const { type, projectData, contactData } = req.body;
    console.log('Request type:', type);

    let properties;
    
    if (type === 'Contact Form') {
      console.log('Creating Contact Form entry...');
      properties = {
        'Task Name': {
          title: [{ text: { content: `${contactData.businessName} - Contact Inquiry` } }]
        },
        'Business Name': {
          rich_text: [{ text: { content: contactData.businessName || '' } }]
        },
        'Client Name': {
          rich_text: [{ text: { content: contactData.name || '' } }]
        },
        'Client Email': {
          email: contactData.email || ''
        },
        'Entry Type': {
          select: { name: 'Contact Form' }
        },
        'Project Type': {
          select: { name: contactData.projectType || 'Other' }
        },
        'Description': {
          rich_text: [{ text: { content: contactData.description || '' } }]
        },
        'Timeline': {
          select: { name: contactData.timeline || 'Not sure' }
        },
        'Status': {
          select: { name: 'New Lead' }
        }
      };
    }

    console.log('Properties to send:', JSON.stringify(properties, null, 2));
    console.log('Database ID:', process.env.NOTION_DATABASE_ID);

    const response = await notion.pages.create({
      parent: {
        database_id: process.env.NOTION_DATABASE_ID!,
      },
      properties,
    });

    console.log('Notion API success:', response.id);
    res.status(200).json({ success: true, id: response.id });
  } catch (error) {
    console.error('Detailed error:', error);
    res.status(500).json({ 
      error: 'Failed to create entry', 
      details: error.message,
      code: error.code 
    });
  }
}
