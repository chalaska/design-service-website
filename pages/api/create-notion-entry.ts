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

    let properties: any = {};
    
    if (type === 'Contact Form') {
      // Set the Name (title) field to business name
      if (contactData.businessName) {
        properties['Name'] = {
          title: [{ text: { content: contactData.businessName } }]
        };
        properties['Business Name'] = {
          rich_text: [{ text: { content: contactData.businessName } }]
        };
      }
      
      if (contactData.name) {
        properties['Client Name'] = {
          rich_text: [{ text: { content: contactData.name } }]
        };
      }
      
      if (contactData.email) {
        properties['Client Email'] = {
          email: contactData.email
        };
      }
      
      properties['Entry Type'] = {
        select: { name: 'Contact Form' }
      };
      
      if (contactData.projectType) {
        properties['Project Type'] = {
          select: { name: contactData.projectType }
        };
      }
      
      if (contactData.description) {
        properties['Description'] = {
          rich_text: [{ text: { content: contactData.description } }]
        };
      }
      
      if (contactData.timeline) {
        properties['Timeline'] = {
          select: { name: contactData.timeline }
        };
      }
      
      properties['Status'] = {
        status: { name: 'New Lead' }
      };
      
    } else if (type === 'Project Brief') {
      // Set the Name (title) field to business name
      if (projectData.businessName) {
        properties['Name'] = {
          title: [{ text: { content: projectData.businessName } }]
        };
        properties['Business Name'] = {
          rich_text: [{ text: { content: projectData.businessName } }]
        };
      }
      
      if (projectData.email) {
        properties['Client Email'] = {
          email: projectData.email
        };
      }
      
      properties['Entry Type'] = {
        select: { name: 'Project Brief' }
      };
      
      if (projectData.whatToCreate) {
        properties['Project Type'] = {
          select: { name: projectData.whatToCreate }
        };
      }
      
      if (projectData.whoIsItFor || projectData.goal || projectData.feeling) {
        const description = [
          projectData.whatToCreate ? `Creating: ${projectData.whatToCreate}` : '',
          projectData.whoIsItFor ? `Audience: ${projectData.whoIsItFor}` : '',
          projectData.goal ? `Goal: ${projectData.goal}` : '',
          projectData.feeling ? `Feeling: ${projectData.feeling}` : ''
        ].filter(Boolean).join('\n');
        
        properties['Description'] = {
          rich_text: [{ text: { content: description } }]
        };
      }
      
      properties['Status'] = {
        status: { name: 'Pending Payment' }
      };
    }

    console.log('Properties being sent:', JSON.stringify(properties, null, 2));

    const response = await notion.pages.create({
      parent: {
        database_id: process.env.NOTION_DATABASE_ID!,
      },
      properties,
    });

    console.log('Success! Created entry:', response.id);
    res.status(200).json({ success: true, id: response.id });
  } catch (error) {
    console.error('Detailed error:', error);
    res.status(500).json({ 
      error: 'Failed to create entry', 
      details: error.message
    });
  }
}
