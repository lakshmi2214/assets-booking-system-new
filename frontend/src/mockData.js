export const MOCK_CATEGORIES = [
    {
        id: 1,
        name: 'Tripods',
        subcategories: [
            { id: 11, name: 'Travel Tripods' },
            { id: 12, name: 'Heavy Duty Tripods' },
        ]
    },
    {
        id: 2,
        name: 'Camera',
        subcategories: [
            { id: 21, name: 'DSLR' },
            { id: 22, name: 'Mirrorless' },
            { id: 23, name: 'Action Cameras' },
        ]
    },
    {
        id: 3,
        name: 'Lights',
        subcategories: [
            { id: 31, name: 'LED Panels' },
            { id: 32, name: 'Fresnel' },
            { id: 33, name: 'Spotlight' },
            { id: 34, name: 'Light with Stand' },
        ]
    },
    {
        id: 4,
        name: 'Mics',
        subcategories: [
            { id: 41, name: 'Wireless Mic' },
            { id: 42, name: 'Podcast Mic' },
            { id: 43, name: 'Condenser Mic' },
        ]
    },
    {
        id: 5,
        name: 'Speakers',
        subcategories: [
            { id: 51, name: 'Portable Speakers' },
            { id: 52, name: 'PA Systems' },
        ]
    },
    {
        id: 6,
        name: 'Audio Mixer',
        subcategories: [
            { id: 61, name: 'Analog Mixers' },
            { id: 62, name: 'Digital Mixers' },
        ]
    },
    {
        id: 7,
        name: 'Battery and Chargers',
        subcategories: [
            { id: 71, name: 'Camera Batteries' },
            { id: 72, name: 'Power Banks' },
        ]
    },
    {
        id: 8,
        name: 'Mikes',
        subcategories: [
            { id: 81, name: 'Wireless' },
            { id: 82, name: 'Condenser' },
            { id: 83, name: 'Dynamic' },
        ]
    },
];

export const MOCK_ASSETS = [
    {
        id: 1,
        name: 'Professional Tripod',
        serial_number: 'TRI-001',
        description: 'Heavy duty tripod for video and photography',
        location: { id: 1, name: 'Main Office' },
        status: 'Available',
        image_url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80',
        category: { id: 1, name: 'Tripods' },
        subcategory: { id: 12, name: 'Heavy Duty Tripods' }
    },
    {
        id: 2,
        name: 'Travel Tripod Compact',
        serial_number: 'TRI-002',
        description: 'Lightweight travel tripod',
        location: { id: 2, name: 'Warehouse A' },
        status: 'Available',
        image_url: 'https://images.unsplash.com/photo-1563201917-67da3638e55f?w=500&q=80',
        category: { id: 1, name: 'Tripods' },
        subcategory: { id: 11, name: 'Travel Tripods' }
    },
    {
        id: 3,
        name: 'Sony A6400 Camera',
        serial_number: 'CAM-001',
        description: 'Professional mirrorless camera',
        location: { id: 1, name: 'Main Office' },
        status: 'Available',
        image_url: 'https://images.unsplash.com/photo-1516724562728-afc824a36e84?w=500&q=80',
        category: { id: 2, name: 'Camera' },
        subcategory: { id: 22, name: 'Mirrorless' }
    },
    {
        id: 4,
        name: 'Canon EOS 5D',
        serial_number: 'CAM-002',
        description: 'Full-frame DSLR camera',
        location: { id: 1, name: 'Main Office' },
        status: 'Available',
        image_url: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500&q=80',
        category: { id: 2, name: 'Camera' },
        subcategory: { id: 21, name: 'DSLR' }
    },
    {
        id: 5,
        name: 'LED Panel Light 100W',
        serial_number: 'LGT-001',
        description: 'Bi-color LED panel for studio lighting',
        location: { id: 1, name: 'Main Office' },
        status: 'Available',
        image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80',
        category: { id: 3, name: 'Lights' },
        subcategory: { id: 31, name: 'LED Panels' }
    },
    {
        id: 6,
        name: 'Light with Stand Kit',
        serial_number: 'LGT-002',
        description: 'Complete lighting kit with adjustable stand',
        location: { id: 2, name: 'Warehouse A' },
        status: 'Available',
        image_url: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=500&q=80',
        category: { id: 3, name: 'Lights' },
        subcategory: { id: 34, name: 'Light with Stand' }
    },
    {
        id: 7,
        name: 'Wireless Lapel Mic',
        serial_number: 'MIC-001',
        description: 'Professional wireless lapel microphone system',
        location: { id: 1, name: 'Main Office' },
        status: 'Available',
        image_url: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=500&q=80',
        category: { id: 4, name: 'Mics' },
        subcategory: { id: 41, name: 'Wireless Mic' }
    },
    {
        id: 8,
        name: 'Podcast USB Mic',
        serial_number: 'MIC-002',
        description: 'USB condenser microphone for podcasting',
        location: { id: 1, name: 'Main Office' },
        status: 'Available',
        image_url: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=500&q=80',
        category: { id: 4, name: 'Mics' },
        subcategory: { id: 42, name: 'Podcast Mic' }
    },
    {
        id: 9,
        name: 'Portable Bluetooth Speaker',
        serial_number: 'SPK-001',
        description: 'Waterproof portable Bluetooth speaker',
        location: { id: 2, name: 'Warehouse A' },
        status: 'Available',
        image_url: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80',
        category: { id: 5, name: 'Speakers' },
        subcategory: { id: 51, name: 'Portable Speakers' }
    },
    {
        id: 10,
        name: 'PA System 500W',
        serial_number: 'SPK-002',
        description: 'Professional PA system for events',
        location: { id: 2, name: 'Warehouse A' },
        status: 'Pending',
        image_url: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=500&q=80',
        category: { id: 5, name: 'Speakers' },
        subcategory: { id: 52, name: 'PA Systems' }
    },
    {
        id: 11,
        name: 'Analog Audio Mixer 8ch',
        serial_number: 'MXR-001',
        description: '8-channel analog audio mixing console',
        location: { id: 1, name: 'Main Office' },
        status: 'Available',
        image_url: 'https://images.unsplash.com/photo-1598653222000-6b7b7a552625?w=500&q=80',
        category: { id: 6, name: 'Audio Mixer' },
        subcategory: { id: 61, name: 'Analog Mixers' }
    },
    {
        id: 12,
        name: 'Camera Battery Pack',
        serial_number: 'BAT-001',
        description: 'High-capacity battery pack for cameras',
        location: { id: 1, name: 'Main Office' },
        status: 'Available',
        image_url: 'https://images.unsplash.com/photo-1612837073745-717c4bc3e7d8?w=500&q=80',
        category: { id: 7, name: 'Battery and Chargers' },
        subcategory: { id: 71, name: 'Camera Batteries' }
    },
    {
        id: 13,
        name: 'Dynamic Mike XLR',
        serial_number: 'MKE-001',
        description: 'Professional dynamic microphone with XLR connector',
        location: { id: 1, name: 'Main Office' },
        status: 'Available',
        image_url: 'https://images.unsplash.com/photo-1453738773917-9c3eff1db985?w=500&q=80',
        category: { id: 8, name: 'Mikes' },
        subcategory: { id: 83, name: 'Dynamic' }
    },
    {
        id: 14,
        name: 'Wireless Mike System',
        serial_number: 'MKE-002',
        description: 'Dual-channel wireless microphone system',
        location: { id: 2, name: 'Warehouse A' },
        status: 'Available',
        image_url: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=500&q=80',
        category: { id: 8, name: 'Mikes' },
        subcategory: { id: 81, name: 'Wireless' }
    },
];
