import z from 'zod';

const image = z.object({
    uri: z.url(),
    type: z.string(),
    name: z.string(),
})

const postSchema = z.object({
    userid: z.string(),
    imageid: z.string().optional(),
    image: image.optional(),
    category: z.enum(['Drainage', 'Ongoing Disaster', 'Road Hazard', 'Others', '']),
    description: z.string().max(500).optional(),
    hazardlevel: z.enum(['Low', 'Medium', 'High']),
    latitude: z.number().min(-90).max(90).optional(),
    longitude: z.number().min(-180).max(180).optional(),
    
})


export { image, postSchema };

