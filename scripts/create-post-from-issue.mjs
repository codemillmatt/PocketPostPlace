import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const issueTitle = normalizeIssueTitle(process.env.ISSUE_TITLE ?? '');
const issueBody = process.env.ISSUE_BODY ?? '';
const publishedAt = process.env.PUBLISHED_AT ?? new Date().toISOString();

if (!issueTitle) {
	throw new Error('ISSUE_TITLE is required.');
}

const sections = extractSections(issueBody);
const description = sections.get('Summary');
const content = sections.get('Post content');

if (!description) {
	throw new Error('The issue body is missing the "Summary" field.');
}

if (!content) {
	throw new Error('The issue body is missing the "Post content" field.');
}

const slug = slugify(issueTitle);

if (!slug) {
	throw new Error('The issue title must contain at least one letter or number.');
}

const filePath = path.join('src', 'content', 'posts', `${slug}.md`);

const markdown = `---
title: ${JSON.stringify(issueTitle)}
description: ${JSON.stringify(description)}
pubDate: ${JSON.stringify(new Date(publishedAt).toISOString())}
---

${content}
`;

await mkdir(path.dirname(filePath), { recursive: true });
await writeFile(filePath, markdown, { encoding: 'utf8', flag: 'wx' });

process.stdout.write(JSON.stringify({ filePath }));

function normalizeIssueTitle(value) {
	return value.replace(/^\[Post\]\s*/i, '').trim();
}

function extractSections(markdown) {
	const sections = new Map();
	const normalized = markdown.replace(/\r\n/g, '\n');

	for (const section of normalized.split(/^### /m).slice(1)) {
		const [headingLine, ...valueLines] = section.split('\n');
		const heading = headingLine.trim();
		const value = valueLines.join('\n').trim();

		if (value && value !== '_No response_') {
			sections.set(heading, value);
		}
	}

	return sections;
}

function slugify(value) {
	return value
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/(^-|-$)/g, '');
}
