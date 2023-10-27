import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession as gSS } from "next-auth"

export function getServerSession() {
	return gSS(authOptions);
}