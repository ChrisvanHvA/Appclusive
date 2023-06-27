import { supabase } from '../config/db.js';

import crypto from 'crypto';

/**
* @param {object} file - The file to be uploaded, as received from multer memory storage
* @returns Promise<string || null> - The URL of the uploaded file
*/
const saveFileToBucket = async (file) => {
    const fileExt = file.originalname.split('.').pop();

    const { data, error } = await supabase.storage
        .from('user_avatars')
        .upload(`${crypto.randomUUID()}.${fileExt}`, file.buffer, {
            contentType: file.mimetype
        });

    if (error) {
        console.error(error);
        return null;
    } else if (data && data.path) {
        return process.env.SUPABASE_AVATARS_BUCKET + data.path;
    }

    return null;
};

export default saveFileToBucket;
