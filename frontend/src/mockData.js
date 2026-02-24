export const MOCK_CATEGORIES = [
    { id: 1, name: 'IT Equipment' },
    { id: 2, name: 'Photography' },
    {
        id: 3,
        name: 'Mikes',
        subcategories: [
            { id: 31, name: 'Wireless' },
            { id: 32, name: 'Condenser' },
            { id: 33, name: 'Dynamic' }
        ]
    },
    {
        id: 4,
        name: 'Lights',
        subcategories: [
            { id: 41, name: 'LED Panels' },
            { id: 42, name: 'Fresnel' },
            { id: 43, name: 'Spotlight' }
        ]
    }
];

export const MOCK_ASSETS = [
    {
        id: 1,
        name: 'Laptop Dell XPS',
        serial_number: 'DELL-001',
        description: 'High-performance laptop for development',
        location: { id: 1, name: 'Main Office' },
        status: 'Available',
        image_url: '/assets/images/photo-1547043904-a62fe1c81e8a.jpeg',
        category: { name: 'IT Equipment' }
    },
    {
        id: 2,
        name: 'Sony A6400 Camera',
        serial_number: 'SONY-CAM-001',
        description: 'Professional mirrorless camera',
        location: { id: 1, name: 'Main Office' },
        status: 'Available',
        image_url: '/assets/images/Camera_1.jpeg',
        category: { name: 'Photography' }
    },
    {
        id: 3,
        name: 'Tripod Professional',
        serial_number: 'TRI-008',
        description: 'Heavy duty tripod for video',
        location: { id: 2, name: 'Warehouse A' },
        status: 'Available',
        image_url: '/assets/images/Tripod_0840.jpg',
        category: { name: 'Photography' }
    }
];
