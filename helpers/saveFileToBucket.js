import { supabase } from '../config/db.js';
import crypto from 'crypto';

/**
 * Save file to the storage bucket
 *
 * @params file: Object - The file to be saved
 * @params oldPath: String - The old file path (optional)
 * @returns String|null - The saved file path or null if there was an error
 */
const saveFileToBucket = async (file, oldPath) => {
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
        if (oldPath) {
            supabase.storage.from('user_avatars').remove([oldPath]);
        }
        return process.env.SUPABASE_AVATARS_BUCKET + data.path;
    }

    return null;
};

export default saveFileToBucket;