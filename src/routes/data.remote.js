import * as v from 'valibot';
import { error } from '@sveltejs/kit';
import { prerender } from '$app/server';

import membersData from '$data/members.csv'
import groupsData from '$data/groups.csv'

export const getMembers = prerender(async () => {
    return await membersData
});

export const getGroups = prerender(async () => {
    return await groupsData
});

export const getMember = prerender('unchecked', async (slug) => {
    return await membersData.filter(d => d.id == slug)
});

export const getGroup = prerender('unchecked', async (slug) => {
    return await groupsData.filter(d => d.id == slug)
});