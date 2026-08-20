
export interface Video {
    id: string;
    title: string;
    description: string;
    url: string;
    duration: string; // formatted as "MM:SS" or "H:MM:SS"
    views: number;
    uploadDate: string; // ISO format "YYYY-MM-DD"
}

export const data: Video[] = [
    {
        "id": "vid_01",
        "title": "Introduction to Web Development",
        "description": "Learn the basic building blocks of websites including HTML, CSS, and JavaScript in this beginner-friendly tutorial.",
        "url": "https://example.com",
        "duration": "12:45",
        "views": 15400,
        "uploadDate": "2026-01-15"
    },
    {
        "id": "vid_02",
        "title": "Easy 15-Minute Home Workout",
        "description": "A quick and effective full-body workout routine you can do at home with no equipment required.",
        "url": "https://example.com",
        "duration": "15:20",
        "views": 42100,
        "uploadDate": "2026-02-10"
    },
    {
        "id": "vid_03",
        "title": "Healthy Breakfast Recipes in 5 Minutes",
        "description": "Discover three fast, nutritious, and delicious breakfast ideas to kickstart your busy morning.",
        "url": "https://example.com",
        "duration": "08:15",
        "views": 8900,
        "uploadDate": "2026-03-01"
    },
    {
        "id": "vid_04",
        "title": "Mastering Git and GitHub",
        "description": "A comprehensive guide to version control, branching, merging, and collaboration for software developers.",
        "url": "https://example.com",
        "duration": "22:10",
        "views": 33100,
        "uploadDate": "2026-03-12"
    },
    {
        "id": "vid_05",
        "title": "Top 10 Travel Destinations for 2026",
        "description": "Explore the most beautiful hidden gems and popular hotspots to add to your travel bucket list this year.",
        "url": "https://example.com",
        "duration": "18:40",
        "views": 125000,
        "uploadDate": "2026-04-05"
    },
    {
        "id": "vid_06",
        "title": "Lo-Fi Beats for Studying and Coding",
        "description": "Relaxing lo-fi hip hop tracks designed to help you focus, study, work, or unwind.",
        "url": "https://example.com",
        "duration": "1:00:00",
        "views": 520000,
        "uploadDate": "2026-04-20"
    },
    {
        "id": "vid_07",
        "title": "Understanding Artificial Intelligence",
        "description": "A simple, non-technical explanation of machine learning, neural networks, and how modern AI works.",
        "url": "https://example.com",
        "duration": "14:15",
        "views": 67400,
        "uploadDate": "2026-05-02"
    },
    {
        "id": "vid_08",
        "title": "How to Plan Your Personal Budget",
        "description": "Step-by-step instructions on setting up a realistic monthly budget, tracking expenses, and saving money.",
        "url": "https://example.com",
        "duration": "11:30",
        "views": 24800,
        "uploadDate": "2026-05-18"
    },
    {
        "id": "vid_09",
        "title": "Basic Landscape Photography Tips",
        "description": "Learn how to use lighting, composition, and camera settings to capture breathtaking outdoor scenery.",
        "url": "https://example.com",
        "duration": "16:55",
        "views": 19200,
        "uploadDate": "2026-06-01"
    },
    {
        "id": "vid_10",
        "title": "10 Hidden iPhone Features You Didn't Know",
        "description": "Uncover secret settings, shortcuts, and features to get the most out of your smartphone experience.",
        "url": "https://example.com",
        "duration": "09:50",
        "views": 88300,
        "uploadDate": "2026-06-14"
    }
]
