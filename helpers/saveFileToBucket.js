import { supabase } from '../config/db.js';
import crypto from 'crypto';

/**
 * Save file to the storage bucket
 *
 * @param {{originalname: string, buffer: Buffer, mimetype: string }} file - The file to be saved
 * @param {string|undefined} oldPath - The old file path (optional)
 * @returns {Promise<string|null>} - The saved file path or null if there was an error
 */
const saveFileToBucket = async (file, oldPath) => {
    const fileExt = file.originalname.split('.').pop();

	let data;
	let error;

	if (file.buffer) {
		const res = await saveFromMemory(file, fileExt);
		data = res.data;
		error = res.error;
	}

    if (error) {
        console.error(error);
        return null;
    } else if (data && data.path) {
        if (oldPath) {
            supabase.storage.from('img').remove([oldPath]);
        }
        return data.path;
    }

    return null;
};

/**
 * Save file to the storage bucket if it's in memory
 *
 * @param {{originalname: string, buffer: Buffer, mimetype: string }} file - The file to be saved
 * @param {string|undefined} oldPath - The old file path (optional)
 * @returns promise<any> - The saved file path or null if there was an error
 */
const saveFromMemory = async (file, fileExt, folder = 'user_avatars') => {
    const { data, error } = await supabase.storage
        .from('img')
        .upload(`${folder}/${crypto.randomUUID()}.${fileExt}`, file.buffer, {
            contentType: file.mimetype
        });

	return { data, error };
};

export default saveFileToBucket;
