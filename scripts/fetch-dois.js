import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';
import dotenv from 'dotenv';

dotenv.config();

const SLACK_TOKEN = process.env.SLACK_BOT_TOKEN;
const CHANNEL_NAME = process.env.SLACK_CHANNEL || 'dois';

if (!SLACK_TOKEN) {
  console.error('Error: SLACK_BOT_TOKEN environment variable is required');
  process.exit(1);
}

async function getChannelId(channelName) {
  const response = await fetch('https://slack.com/api/conversations.list', {
    headers: {
      'Authorization': `Bearer ${SLACK_TOKEN}`,
      'Content-Type': 'application/json'
    }
  });
  
  const data = await response.json();
  
  if (!data.ok) {
    throw new Error(`Failed to fetch channels: ${data.error}`);
  }
  
  const channel = data.channels.find(c => c.name === channelName);
  
  if (!channel) {
    throw new Error(`Channel #${channelName} not found`);
  }
  
  return channel.id;
}

async function fetchMessages(channelId) {
  const response = await fetch(`https://slack.com/api/conversations.history?channel=${channelId}&limit=1000`, {
    headers: {
      'Authorization': `Bearer ${SLACK_TOKEN}`,
      'Content-Type': 'application/json'
    }
  });
  
  const data = await response.json();
  
  if (!data.ok) {
    throw new Error(`Failed to fetch messages: ${data.error}`);
  }
  
  return data.messages;
}

function parseMessage(text) {
  const doiMatch = text.match(/DOI:\s*([^\s|]+)/i);
  const projectMatch = text.match(/Project:\s*([^\s|]+)/i);
  
  if (doiMatch && projectMatch) {
    return {
      doi: doiMatch[1].trim(),
      project: projectMatch[1].trim().toLowerCase()
    };
  }
  
  return null;
}

function addDoiToCsv(doi, project) {
  const csvPath = join('src/data/publications', `${project}.csv`);
  
  if (!existsSync(csvPath)) {
    writeFileSync(csvPath, 'doi\n');
  }
  
  const content = readFileSync(csvPath, 'utf-8');
  const lines = content.trim().split('\n');
  
  if (lines.includes(doi)) {
    console.log(`DOI ${doi} already exists in ${project}.csv`);
    return false;
  }
  
  lines.push(doi);
  writeFileSync(csvPath, lines.join('\n') + '\n');
  console.log(`✓ Added ${doi} to ${project}.csv`);
  return true;
}

async function main() {
  try {
    console.log(`Fetching DOIs from #${CHANNEL_NAME}...`);
    
    const channelId = await getChannelId(CHANNEL_NAME);
    const messages = await fetchMessages(channelId);
    
    let addedCount = 0;
    
    for (const message of messages) {
      const parsed = parseMessage(message.text);
      
      if (parsed) {
        const added = addDoiToCsv(parsed.doi, parsed.project);
        if (added) addedCount++;
      }
    }
    
    console.log(`\nDone! Added ${addedCount} new DOI(s)`);
    
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();