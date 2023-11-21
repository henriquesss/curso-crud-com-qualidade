import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(request: NextApiRequest, response: NextApiResponse) {
	response.json({ message: 'Olá mundo'});
}
