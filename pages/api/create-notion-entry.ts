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
      
      // Use status format instead of select
      properties['Status'] = {
        status: { name: 'New Lead' }
      };
      
    } else if (type === 'Project Brief') {
      if (projectData.businessName && projectData.whatToCreate) {
        properties['Task Name'] = {
          rich_text: [{ text: { content: `${projectData.businessName} - ${projectData.whatToCreate}` } }]
        };
      }
      
      if (projectData.businessName) {
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
          projectData.whoIsItFor ? `Audience: ${projectData.whoIsItFor}` : '',
          projectData.goal ? `Goal: ${projectData.goal}` : '',
          projectData.feeling ? `Feeling: ${projectData.feeling}` : ''
        ].filter(Boolean).join('\n');
        
        properties['Description'] = {
          rich_text: [{ text: { content: description } }]
