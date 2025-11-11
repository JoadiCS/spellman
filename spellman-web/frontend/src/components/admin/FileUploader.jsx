import useFileUpload from '../../hooks/useFileUpload.js';
import Spinner from '../ui/spinner.jsx';

const FileUploader = ({ label, onUploaded, type = 'image' }) => {
  const { uploading, handleUpload } = useFileUpload();

  const onChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const url = await handleUpload(file, 'sections', type);
    onUploaded(url);
  };

  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold text-neutral-700">{label}</p>
      <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-dashed border-neutral-300 p-4">
        <input type="file" className="hidden" onChange={onChange} />
        {uploading ? <Spinner /> : <span className="text-sm text-neutral-600">Upload file</span>}
      </label>
    </div>
  );
};

export default FileUploader;
