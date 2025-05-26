import { supabase } from '../lib/supabase';

export interface Page {
    id: string;
    slug: string;
    title: string;
    content: string;
    language: string;
    status: 'draft' | 'published' | 'archived';
    created_by: string | null;
    updated_by: string | null;
    created_at: string;
    updated_at: string;
}

export interface CreatePageData {
    slug: string;
    title: string;
    content: string;
    language?: string;
    status?: 'draft' | 'published' | 'archived';
}

export interface UpdatePageData {
    title?: string;
    content?: string;
    language?: string;
    status?: 'draft' | 'published' | 'archived';
}

export const pageService = {
    async getPages(language?: string) {
        try {
            console.log('Fetching pages...', { language });
            
            const query = supabase
                .from('pages')
                .select('*')
                .order('created_at', { ascending: false });

            if (language) {
                query.eq('language', language);
            }

            const { data, error } = await query;

            if (error) {
                console.error('Error fetching pages:', error);
                throw new Error(`Failed to fetch pages: ${error.message}`);
            }

            console.log('Pages fetched successfully:', data?.length);
            return data as Page[];
        } catch (error) {
            console.error('Unexpected error in getPages:', error);
            throw error;
        }
    },

    async getPageBySlug(slug: string, language?: string) {
        try {
            console.log('Fetching page by slug...', { slug, language });
            
            const query = supabase
                .from('pages')
                .select('*')
                .eq('slug', slug)
                .single();

            if (language) {
                query.eq('language', language);
            }

            const { data, error } = await query;

            if (error) {
                console.error('Error fetching page by slug:', error);
                throw new Error(`Failed to fetch page: ${error.message}`);
            }

            console.log('Page fetched successfully:', data?.id);
            return data as Page;
        } catch (error) {
            console.error('Unexpected error in getPageBySlug:', error);
            throw error;
        }
    },

    async createPage(pageData: CreatePageData) {
        try {
            console.log('Creating new page...', pageData);
            
            const { data: userData, error: userError } = await supabase.auth.getUser();
            if (userError) {
                throw new Error(`Authentication error: ${userError.message}`);
            }

            const userId = userData.user?.id;
            if (!userId) {
                throw new Error('User not authenticated');
            }

            const { data, error } = await supabase
                .from('pages')
                .insert([{
                    ...pageData,
                    created_by: userId,
                    updated_by: userId
                }])
                .select()
                .single();

            if (error) {
                console.error('Error creating page:', error);
                throw new Error(`Failed to create page: ${error.message}`);
            }

            console.log('Page created successfully:', data?.id);
            return data as Page;
        } catch (error) {
            console.error('Unexpected error in createPage:', error);
            throw error;
        }
    },

    async updatePage(id: string, pageData: UpdatePageData) {
        try {
            console.log('Updating page...', { id, pageData });
            
            const { data: userData, error: userError } = await supabase.auth.getUser();
            if (userError) {
                throw new Error(`Authentication error: ${userError.message}`);
            }

            const userId = userData.user?.id;
            if (!userId) {
                throw new Error('User not authenticated');
            }

            const { data, error } = await supabase
                .from('pages')
                .update({
                    ...pageData,
                    updated_by: userId
                })
                .eq('id', id)
                .select()
                .single();

            if (error) {
                console.error('Error updating page:', error);
                throw new Error(`Failed to update page: ${error.message}`);
            }

            console.log('Page updated successfully:', data?.id);
            return data as Page;
        } catch (error) {
            console.error('Unexpected error in updatePage:', error);
            throw error;
        }
    },

    async deletePage(id: string) {
        try {
            console.log('Deleting page...', { id });
            
            const { error } = await supabase
                .from('pages')
                .delete()
                .eq('id', id);

            if (error) {
                console.error('Error deleting page:', error);
                throw new Error(`Failed to delete page: ${error.message}`);
            }

            console.log('Page deleted successfully:', id);
        } catch (error) {
            console.error('Unexpected error in deletePage:', error);
            throw error;
        }
    }
}; 