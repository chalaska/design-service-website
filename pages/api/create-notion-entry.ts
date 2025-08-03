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
    const { type, projectData, contactData } = req.body;

    let properties;
    
    if (type === 'Project Brief') {
      properties = {
        'Task Name': {
          title: [{ text: { content: `${projectData.businessName} - ${projectData.whatToCreate}` } }]
        },
        'Business Name': {
          rich_text: [{ text: { content: projectData.businessName } }]
        },
        'Client Email': {
          email: projectData.email
        },
        'Entry Type': {
          select: { name: 'Project Brief' }
        },
        'Project Type': {
          select: { name: projectData.whatToCreate }
        },
        'Description': {
          rich_text: [{ 
            text: { 
              content: `Audience: ${projectData.whoIsItFor}\nGoal: ${projectData.goal}\nFeeling: ${projectData.feeling}` 
            } 
          }]
        },
        'Status': {
          select: { name: 'Pending Payment' }
        }
      };
    } else {
      // Contact Form
      properties = {
        'Task Name': {
          title: [{ text: { content: `${contactData.businessName} - Contact Inquiry` } }]
        },
        'Business Name': {
          rich_text: [{ text: { content: contactData.businessName } }]
        },
        'Client Name': {
          rich_text: [{ text: { content: contactData.name } }]
        },
        'Client Email': {
          email: contactData.email
        },
        'Entry Type': {
          select: { name: 'Contact Form' }
        },
        'Project Type': {
          select: { name: contactData.projectType }
        },
        'Description': {
          rich_text: [{ text: { content: contactData.description } }]
        },
        'Timeline': {
          select: { name: contactData.timeline }
        },
        'Status': {
          select: { name: 'New Lead' }
        }
      };
    }

    const response = await notion.pages.create({
      parent: {
        database_id: process.env.NOTION_DATABASE_ID!,
      },
      properties,
    });

    res.status(200).json({ success: true, id: response.id });
  } catch (error) {
    console.error('Error creating Notion entry:', error);
    res.status(500).json({ error: 'Failed to create entry', details: error.message });
  }
}
