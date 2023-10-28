'use server';

import { getServerSession } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { VolumeUnit } from '@prisma/client';
import { revalidatePath } from 'next/cache';
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

export async function createVessel(formData: FormData) {
	const name = formData.get('name') as string;
	const type = formData.get('type') as string;
	const volume = formData.get('volume') as string;
	const volumeUnit = formData.get('volumeUnit') as VolumeUnit;

	const session = await getServerSession();

	if (!session) {
		return {
			message: 'You must be logged in to create a vessel',
		}
	}

	try {
		const newVessel = await prisma.vessel.create({
			data: {
				name,
				type,
				volume: parseInt(volume),
				volumeUnit,
				user: {
					connect: {
						id: session.user.id,
					}
				},
			},
		});
		revalidatePath('/vessels');
	} catch (error) {
		console.error(error);
		return {
			message: 'Error creating vessel',
		}
	}
}