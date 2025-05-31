const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
    if (res.ok) {
        return res.json();
    } else {
        throw new Error('Bad Response');
    }
}

export default class ExternalServices {
    constructor() {
        this.basePath = '/data/'; // Path to your JSON files
    }

    async getData(category) {
        try {
            const response = await fetch(`${this.basePath}${category}.json`);
            if (!response.ok) {
                throw new Error('Bad Response');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    }

    async findProductById(id) {
        // We'll implement this later if needed
        throw new Error('Not implemented yet');
    }

    async checkout(payload) {
        // We'll implement this later if needed
        throw new Error('Not implemented yet');
    }
}