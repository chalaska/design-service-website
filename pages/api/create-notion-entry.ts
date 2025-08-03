import { NextApiRequest, NextApiResponse } from 'next';
import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

// Kit API helper function
async function addToKit(email: string, firstName: string, businessName: string, tags: string[]) {
  try {
    const response = await fetch(`https://api.convertkit.com/v3/subscribers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: process.env.KIT_API_KEY,
        email: email,
        first_name: firstName,
        fields: {
          business_name: businessName
        },
        tags: tags
      }),
    });
    return response.ok;
  } catch (error) {
    console.error('Kit API error:', error);
    return false;
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { type, projectData, contactData } = req.body;

    let properties;
    let kitTags: string[] = [];
    let email = '';
    let firstName = '';
    let businessName = '';
    
    if (type === 'Project Brief') {
      // Extract first name from business context or use business name
      firstName = projectData.businessName.split(' ')[0];
      email = projectData.email;
      businessName = projectData.businessName;
      kitTags = ['project-brief', 'pending-payment', projectData.whatToCreate.toLowerCase().replace(' ', '-')];
      
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
      firstName = contactData.name;
      email = contactData.email;
      businessName = contactData.businessName;
      kitTags = ['contact-form', 'new-lead', contactData.projectType.toLowerCase().replace(' ', '-')];
      
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

    // Create Notion entry
    const notionResponse = await notion.pages.create({
      parent: {
        database_id: process.env.NOTION_DATABASE_ID!,
      },
      properties,
    });

    // Add to Kit with appropriate tags
    const kitSuccess = await addToKit(email, firstName, businessName, kitTags);

    res.status(200).json({ 
      success: true, 
      notionId: notionResponse.id,
      kitAdded: kitSuccess,
      tags: kitTags 
    });
  } catch (error) {
    console.error('Error creating entry:', error);
    res.status(500).json({ error: 'Failed to create entry' });
  }
}
