import type { BlogPost, RunningPB, FriendsData, RunningTraining } from './types';

export const mockBlogPosts: BlogPost[] = [
	{
		creationDate: new Date('2024-01-15'),
		title: 'The Future of Quantum Computing',
		image: '/images/placeholder.svg',
		labels: ['quantum', 'computing', 'research'],
		post: '/posts/quantum-computing.md',
		categories: ['science']
	},
	{
		creationDate: new Date('2024-02-20'),
		title: 'Machine Learning in Healthcare',
		image: '/images/placeholder.svg',
		labels: ['machine-learning', 'healthcare', 'AI'],
		post: '/posts/ml-healthcare.md',
		categories: ['science']
	},
	{
		creationDate: new Date('2024-03-10'),
		title: 'Neural Networks Explained',
		image: '/images/placeholder.svg',
		labels: ['neural-networks', 'deep-learning', 'tutorial'],
		post: '/posts/neural-networks.md',
		categories: ['science']
	},
	{
		creationDate: new Date('2024-01-25'),
		title: 'My First Marathon Experience',
		image: '/images/placeholder.svg',
		labels: ['marathon', 'running', 'experience'],
		post: '/posts/first-marathon.md',
		categories: ['running']
	},
	{
		creationDate: new Date('2024-02-15'),
		title: 'Training for a 10K Race',
		image: '/images/placeholder.svg',
		labels: ['10k', 'training', 'running'],
		post: '/posts/10k-training.md',
		categories: ['running']
	},
	{
		creationDate: new Date('2024-03-05'),
		title: 'Best Running Shoes 2024',
		image: '/images/placeholder.svg',
		labels: ['shoes', 'gear', 'running'],
		post: '/posts/best-shoes-2024.md',
		categories: ['running']
	},
	{
		creationDate: new Date('2024-01-30'),
		title: 'Learning to Play Guitar',
		image: '/images/placeholder.svg',
		labels: ['guitar', 'music', 'learning'],
		post: '/posts/learning-guitar.md',
		categories: ['music']
	},
	{
		creationDate: new Date('2024-02-25'),
		title: 'My Favorite Jazz Albums',
		image: '/images/placeholder.svg',
		labels: ['jazz', 'music', 'albums'],
		post: '/posts/favorite-jazz.md',
		categories: ['music']
	},
	{
		creationDate: new Date('2024-03-15'),
		title: 'The Science of Music Theory',
		image: '/images/placeholder.svg',
		labels: ['music-theory', 'science', 'education'],
		post: '/posts/music-theory-science.md',
		categories: ['science', 'music']
	}
];

export const mockRunningPBs: RunningPB[] = [
	{
		eventDate: new Date('2024-01-10'),
		eventLocation: 'Central Park, NYC',
		distance: '5k',
		usedShoe: 'Nike ZoomX Vaporfly Next% 2',
		time: '18:45'
	},
	{
		eventDate: new Date('2024-02-15'),
		eventLocation: 'Brooklyn Bridge Run',
		distance: '10k',
		usedShoe: 'Adidas Adizero Adios Pro 3',
		time: '39:12'
	},
	{
		eventDate: new Date('2024-03-20'),
		eventLocation: 'NYC Half Marathon',
		distance: 'Half Marathon',
		usedShoe: 'Nike ZoomX Vaporfly Next% 2',
		time: '1:28:30'
	},
	{
		eventDate: new Date('2024-04-15'),
		eventLocation: 'Boston Marathon',
		distance: 'Marathon',
		usedShoe: 'Adidas Adizero Adios Pro 3',
		time: '3:15:45'
	}
];

export const mockFriendsData: FriendsData[] = [
	{
		name: 'Sarah Johnson',
		image: '/images/placeholder.svg',
		text: 'Anton is one of the most dedicated runners I know. His commitment to training and his positive attitude make him a great running partner.',
		role: 'Professional Couch Potato Turned Running Enthusiast'
	},
	{
		name: 'Mike Chen',
		image: '/images/placeholder.svg',
		text: 'Working with Anton on research projects has been incredible. His analytical thinking and attention to detail are outstanding.',
		role: 'Coffee-Fueled Research Wizard'
	},
	{
		name: 'Emma Davis',
		image: '/images/placeholder.svg',
		text: 'Anton\'s passion for music is infectious. He has a great ear and always finds the most interesting new artists to share.',
		role: 'Vinyl Record Hoarder & Music Detective'
	},
	{
		name: 'David Wilson',
		image: '/images/placeholder.svg',
		text: 'I\'ve known Anton for years and his growth as both a scientist and athlete has been inspiring to watch.',
		role: 'Certified Lab Rat & Weekend Warrior'
	},
	{
		name: 'Lisa Rodriguez',
		image: '/images/placeholder.svg',
		text: 'Anton\'s blog posts are always insightful and well-researched. He has a unique way of explaining complex topics.',
		role: 'Grammar Nazi & Internet Explorer'
	}
];

export const mockRunningTraining: RunningTraining[] = [
	{ date: new Date('2024-01-01'), distance: 8.5 },
	{ date: new Date('2024-01-02'), distance: 0 }, // Rest day
	{ date: new Date('2024-01-03'), distance: 12.0 },
	{ date: new Date('2024-01-04'), distance: 6.2 },
	{ date: new Date('2024-01-05'), distance: 0 }, // Rest day
	{ date: new Date('2024-01-06'), distance: 15.0 },
	{ date: new Date('2024-01-07'), distance: 5.0 },
	{ date: new Date('2024-01-08'), distance: 10.0 },
	{ date: new Date('2024-01-09'), distance: 0 }, // Rest day
	{ date: new Date('2024-01-10'), distance: 8.5 },
	{ date: new Date('2024-01-11'), distance: 13.1 },
	{ date: new Date('2024-01-12'), distance: 6.0 },
	{ date: new Date('2024-01-13'), distance: 0 }, // Rest day
	{ date: new Date('2024-01-14'), distance: 16.0 },
	{ date: new Date('2024-01-15'), distance: 7.5 },
	{ date: new Date('2024-01-16'), distance: 9.0 },
	{ date: new Date('2024-01-17'), distance: 0 }, // Rest day
	{ date: new Date('2024-01-18'), distance: 11.0 },
	{ date: new Date('2024-01-19'), distance: 5.5 },
	{ date: new Date('2024-01-20'), distance: 14.0 },
	{ date: new Date('2024-01-21'), distance: 0 }, // Rest day
	{ date: new Date('2024-01-22'), distance: 8.0 },
	{ date: new Date('2024-01-23'), distance: 12.5 },
	{ date: new Date('2024-01-24'), distance: 6.8 },
	{ date: new Date('2024-01-25'), distance: 0 }, // Rest day
	{ date: new Date('2024-01-26'), distance: 17.0 },
	{ date: new Date('2024-01-27'), distance: 7.0 },
	{ date: new Date('2024-01-28'), distance: 9.5 },
	{ date: new Date('2024-01-29'), distance: 0 }, // Rest day
	{ date: new Date('2024-01-30'), distance: 10.5 },
	{ date: new Date('2024-01-31'), distance: 13.8 }
];
