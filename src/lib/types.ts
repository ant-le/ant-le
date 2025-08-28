export type BlogCategory = 'science' | 'running' | 'music';
export type RunningDistance = '5k' | '10k' | 'Half Marathon' | 'Marathon';
export type Theme = 'minimal' | 'artistic';

export interface BlogPost {
	creationDate: Date;
	title: string;
	image: string;
	labels: string[];
	post: string; // Filepath to the full post
	categories: BlogCategory[];
}

export interface RunningPB {
	eventDate: Date;
	eventLocation: string;
	distance: RunningDistance;
	usedShoe: string;
	time?: string; // Optional time for the PB
}

export interface FriendsData {
	name: string;
	image: string;
	text: string;
	role: string; // Silly description of their role
}

export interface RunningTraining {
	date: Date;
	distance: number; // in kilometers
}
