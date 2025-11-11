import { useEffect, useState } from 'react';
import Input from '../ui/input.jsx';
import Textarea from '../ui/textarea.jsx';
import Select from '../ui/select.jsx';
import Button from '../ui/button.jsx';
import FileUploader from './FileUploader.jsx';
import { createContentItem, updateContentItem, deleteContentItem } from '../../services/contentService.js';
import { useToast } from '../../context/ToastContext.jsx';

const sectionFields = {
  hero: [
    { name: 'title', label: 'Title', component: 'input' },
    { name: 'subtitle', label: 'Subtitle', component: 'input' },
    { name: 'hookWords', label: 'Hook words (comma-separated)', component: 'input' },
    { name: 'description', label: 'Description', component: 'textarea' },
    { name: 'backgroundVideoUrl', label: 'Background video URL', component: 'input' },
    { name: 'videoPosterUrl', label: 'Video poster URL', component: 'input' },
    { name: 'imageUrl', label: 'Fallback image URL', component: 'input' },
    { name: 'buttonText', label: 'Primary button text', component: 'input' },
    { name: 'secondaryButtonText', label: 'Secondary button text', component: 'input' }
  ],
  impact: [
    { name: 'title', label: 'Section title', component: 'input' },
    { name: 'statTitle', label: 'Statistic title', component: 'input' },
    { name: 'statDescription', label: 'Statistic description', component: 'textarea' },
    { name: 'imageUrl', label: 'Background image URL', component: 'input' },
    { name: 'displayOrder', label: 'Order', component: 'input', type: 'number' }
  ],
  projects: [
    { name: 'title', label: 'Badge text', component: 'input' },
    { name: 'projectTitle', label: 'Project title', component: 'input' },
    { name: 'projectDescription', label: 'Project description', component: 'textarea' },
    { name: 'projectImageUrl', label: 'Project image URL', component: 'input' },
    { name: 'color', label: 'Theme color class', component: 'input' },
    { name: 'displayOrder', label: 'Order', component: 'input', type: 'number' }
  ],
  goals: [
    { name: 'goalTitle', label: 'Goal title', component: 'input' },
    { name: 'shortDescription', label: 'Short description', component: 'textarea' },
    { name: 'longDescription', label: 'Long description', component: 'textarea' },
    { name: 'imageUrl', label: 'Background image URL', component: 'input' },
    { name: 'color', label: 'Color token', component: 'input' },
    { name: 'displayOrder', label: 'Order', component: 'input', type: 'number' }
  ],
  join: [
    { name: 'title', label: 'Title', component: 'input' },
    { name: 'description', label: 'Description', component: 'textarea' },
    { name: 'buttonText', label: 'Button text', component: 'input' }
  ],
  footer: [
    { name: 'orgName', label: 'Organization name', component: 'input' },
    { name: 'address', label: 'Address', component: 'textarea' },
    { name: 'email', label: 'Email', component: 'input' },
    { name: 'phone', label: 'Phone', component: 'input' },
    { name: 'newsletterButtonText', label: 'Newsletter button text', component: 'input' }
  ]
};

const mediaFieldTypes = {
  imageUrl: 'image',
  projectImageUrl: 'image',
  videoPosterUrl: 'image',
  backgroundVideoUrl: 'video'
};

const SectionEditor = ({ section, item, onSaved, onDeleted }) => {
  const blankState = { section };
  const [form, setForm] = useState(item || blankState);
  const [saving, setSaving] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    setForm(item ? { ...item } : { section });
  }, [item, section]);

  const handleChange = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpload = (name, url) => {
    handleChange(name, url);
    addToast({ title: 'Upload complete' });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    try {
      const payload = { ...form, section };
      const response = form.id
        ? await updateContentItem(form.id, payload)
        : await createContentItem(payload);
      addToast({ title: 'Content saved' });
      onSaved?.(response);
    } catch (error) {
      console.error(error);
      addToast({ title: 'Save failed', description: error.message });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!form.id) return;
    try {
      await deleteContentItem(form.id);
      addToast({ title: 'Content removed' });
      onDeleted?.(form.id);
    } catch (error) {
      addToast({ title: 'Delete failed', description: error.message });
    }
  };

  const fields = sectionFields[section] || [];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">Section: {section}</p>
      {fields.map((field) => {
        const commonProps = {
          key: field.name,
          value: form[field.name] || '',
          onChange: (event) => handleChange(field.name, event.target.value)
        };

        const mediaType = mediaFieldTypes[field.name];

        return (
          <div key={field.name} className="space-y-2">
            <label className="text-sm font-semibold text-neutral-800">{field.label}</label>
            {field.component === 'textarea' ? (
              <Textarea {...commonProps} rows={4} />
            ) : field.component === 'select' ? (
              <Select {...commonProps}>
                {(field.options || []).map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            ) : (
              <Input type={field.type || 'text'} {...commonProps} />
            )}
            {mediaType ? (
              <FileUploader
                label={`Upload ${field.label}`}
                type={mediaType}
                onUploaded={(url) => handleUpload(field.name, url)}
              />
            ) : null}
          </div>
        );
      })}
      <div className="flex gap-4">
        <Button type="submit" disabled={saving}>
          {saving ? 'Saving…' : 'Save content'}
        </Button>
        {form.id ? (
          <Button type="button" variant="secondary" onClick={handleDelete}>
            Delete
          </Button>
        ) : null}
      </div>
    </form>
  );
};

export default SectionEditor;
