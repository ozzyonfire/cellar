'use server';

import { getServerSession } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';

export async function createBatch(formData: FormData) {
	// parse the form data
	const name = formData.get('name') as string;
	const vintage = formData.get('vintage') as string;
	const session = await getServerSession();

	console.log('got server action');

	if (!session) {
		return {
			message: 'You must be logged in to create a batch',
		}
	}

	const newBatch = await prisma.batch.create({
		data: {
			name,
			vintage: parseInt(vintage),
			user: {
				connect: {
					id: session.user.id,
				}
			},
		},
	});

	redirect(`/batches/${newBatch.id}`);
}

export async function testAction(formData?: FormData) {
	console.log(formData);
	console.log('test action');
	return {
		message: 'test action',
	}
}