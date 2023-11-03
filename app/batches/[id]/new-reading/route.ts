import { getServerSession } from "@/lib/auth"
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";


const handler = async (request: Request, { params }: {
	params: { id: string }
}) => {
	const session = await getServerSession();
	const baseUrl = new URL(request.url).origin;

	if (!session) {
		return NextResponse.redirect("/");
	}

	const { id } = params;

	// create a new reading
	const newReading = await prisma.reading.create({
		data: {
			batch: {
				connect: {
					id,
				}
			},
			date: new Date(),
		},
	});

	// redirect to the new reading
	return NextResponse.redirect(`${baseUrl}/batches/${id}/readings/${newReading.id}`);
}

export {
	handler as GET
}