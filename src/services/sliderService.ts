import { supabase } from '../lib/supabase';

export interface SliderItem {
    id: string;
    title: string;
    description: string;
    image: string;
    image_webp?: string;
    order_index: number;
    is_active: boolean;
    language: string;
    created_by: string | null;
    updated_by: string | null;
    created_at: string;
    updated_at: string;
}

export interface CreateSliderItemData {
    title: string;
    description: string;
    image: string;
    image_webp?: string;
    order_index?: number;
    is_active?: boolean;
    language?: string;
}

export interface UpdateSliderItemData {
    title?: string;
    description?: string;
    image?: string;
    image_webp?: string;
    order_index?: number;
    is_active?: boolean;
    language?: string;
}

class SliderService {
    async getSliderItems(language: string = 'en'): Promise<SliderItem[]> {
        const { data, error } = await supabase
            .from('slider')
            .select('*')
            .eq('language', language)
            .eq('is_active', true)
            .order('order_index', { ascending: true });

        if (error) throw error;
        return data || [];
    }

    async createSliderItem(item: CreateSliderItemData): Promise<SliderItem> {
        const { data, error } = await supabase
            .from('slider')
            .insert([item])
            .select()
            .single();

        if (error) throw error;
        return data;
    }

    async updateSliderItem(id: string, item: UpdateSliderItemData): Promise<SliderItem> {
        const { data, error } = await supabase
            .from('slider')
            .update(item)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data;
    }

    async deleteSliderItem(id: string): Promise<void> {
        const { error } = await supabase
            .from('slider')
            .delete()
            .eq('id', id);

        if (error) throw error;
    }

    async reorderSliderItems(items: { id: string; order_index: number }[]): Promise<void> {
        const { error } = await supabase
            .from('slider')
            .upsert(items);

        if (error) throw error;
    }
}

export const sliderService = new SliderService(); 