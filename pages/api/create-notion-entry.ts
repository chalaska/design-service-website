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
      // Only add properties that exist in your database and have values
      if (contactData.businessName) {
        properties['Task Name'] = {
          rich_text: [{ text: { content: `${contactData.businessName} - Contact Inquiry` } }]
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
      
      // Always set Entry Type
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
      
      // Always set Status
      properties['Status'] = {
        select: { name: 'New Lead' }
      };
      
    } else if (type === 'Project Brief') {
      // Project Brief handling
      if (projectData.businessName && pro
