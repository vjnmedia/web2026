import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const RichTextEditor = ({ value, onChange }: RichTextEditorProps) => {
  const [isEditorLoaded, setIsEditorLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link', 'image'],
      ['clean']
    ],
  };

  useEffect(() => {
    console.log('RichTextEditor mounted');
    setIsEditorLoaded(true);
    return () => {
      console.log('RichTextEditor unmounted');
    };
  }, []);

  const handleChange = (content: string) => {
    try {
      onChange(content);
    } catch (error) {
      console.error('Error in RichTextEditor onChange:', error);
      setError('An error occurred while updating the content.');
    }
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!isEditorLoaded) {
    return <div>Loading editor...</div>;
  }

  return (
    <div>
      <ReactQuill
        value={value}
        onChange={handleChange}
        modules={modules}
        className="w-full h-64"
      />
    </div>
  );
};

export default RichTextEditor; 