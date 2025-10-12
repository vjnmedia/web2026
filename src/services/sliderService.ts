import { supabase } from '@/lib/supabase';

export interface SliderItem {
  id: string;
  title: string;
  description: string;
  image: string;
  image_webp?: string;
  order_index: number;
  is_active: boolean;
  language: 'en' | 'fr';
  created_by?: string;
  updated_by?: string;
  created_at: string;
  updated_at: string;
}

export const sliderService = {
  async getSliders(language?: string): Promise<SliderItem[]> {
    let query = supabase
      .from('slider')
      .select('*')
      .eq('is_active', true)
      .order('order_index', { ascending: true });

    if (language) {
      query = query.eq('language', language);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data || [];
  },

  async getSlider(id: string): Promise<SliderItem> {
    const { data, error } = await supabase
      .from('slider')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  async createSlider(slider: Omit<SliderItem, 'id' | 'created_at' | 'updated_at'>): Promise<SliderItem> {
    const { data, error } = await supabase
      .from('slider')
      .insert([slider])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateSlider(id: string, updates: Partial<SliderItem>): Promise<SliderItem> {
    const { data, error } = await supabase
      .from('slider')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteSlider(id: string): Promise<void> {
    const { error } = await supabase
      .from('slider')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  async updateSliderOrder(sliders: { id: string; order_index: number }[]): Promise<void> {
    const updates = sliders.map(slider => 
      supabase
        .from('slider')
        .update({ order_index: slider.order_index })
        .eq('id', slider.id)
    );

    const results = await Promise.all(updates);
    
    for (const result of results) {
      if (result.error) throw result.error;
    }
  },

  async uploadSliderImage(file: File): Promise<string> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `slider/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('slider')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('slider')
      .getPublicUrl(filePath);

    return data.publicUrl;
  },

  async deleteSliderImage(imagePath: string): Promise<void> {
    const fileName = imagePath.split('/').pop();
    if (!fileName) return;

    const { error } = await supabase.storage
      .from('slider')
      .remove([`slider/${fileName}`]);

    if (error) throw error;
  }
};