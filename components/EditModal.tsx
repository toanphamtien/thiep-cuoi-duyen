
import React, { useState } from 'react';
import { WeddingData, ScheduleItem } from '../types';
import { X, Save, Upload, Plus, Trash2 } from 'lucide-react';

interface EditModalProps {
  data: WeddingData;
  onSave: (data: WeddingData) => void;
  onClose: () => void;
}

const EditModal: React.FC<EditModalProps> = ({ data, onSave, onClose }) => {
  const [formData, setFormData] = useState<WeddingData>(data);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, field: keyof WeddingData) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, [field]: url }));
    }
  };

  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
     const files = e.target.files;
     if (files && files.length > 0) {
         const newUrls = Array.from(files).map(file => URL.createObjectURL(file as File));
         setFormData(prev => ({
             ...prev,
             galleryImages: [...prev.galleryImages, ...newUrls]
         }));
     }
  };

  const removeGalleryImage = (index: number) => {
      const newGallery = formData.galleryImages.filter((_, i) => i !== index);
      setFormData(prev => ({...prev, galleryImages: newGallery}));
  }

  const handleScheduleChange = (index: number, field: keyof ScheduleItem, value: string) => {
      const newSchedule = [...formData.weddingSchedule];
      newSchedule[index] = { ...newSchedule[index], [field]: value };
      setFormData(prev => ({ ...prev, weddingSchedule: newSchedule }));
  };

  const addScheduleItem = () => {
      setFormData(prev => ({
          ...prev,
          weddingSchedule: [...prev.weddingSchedule, { time: "", activity: "" }]
      }));
  };

  const removeScheduleItem = (index: number) => {
      const newSchedule = formData.weddingSchedule.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, weddingSchedule: newSchedule }));
  };

  const handleExport = () => {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(formData, null, 2));
      const downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", "wedding_data.json");
      document.body.appendChild(downloadAnchorNode);
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
  }

  return (
    <div className="fixed inset-0 z-[60] bg-black/80 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white text-gray-800 w-full max-w-3xl rounded-lg shadow-2xl flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center p-4 border-b bg-gray-100 rounded-t-lg">
          <h2 className="text-xl font-bold">Chỉnh Sửa Nội Dung</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full"><X /></button>
        </div>
        
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
            
            {/* Names */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="block text-sm font-semibold">Tên Chú Rể</label>
                    <input name="groomName" value={formData.groomName} onChange={handleChange} className="w-full border p-2 rounded" />
                    <label className="block text-sm font-semibold mt-2">Ảnh Chú Rể</label>
                    <div className="flex gap-2 items-center">
                        <img src={formData.groomPhoto} className="w-10 h-10 object-cover rounded-full" />
                        <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'groomPhoto')} className="text-sm" />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-semibold">Tên Cô Dâu</label>
                    <input name="brideName" value={formData.brideName} onChange={handleChange} className="w-full border p-2 rounded" />
                    <label className="block text-sm font-semibold mt-2">Ảnh Cô Dâu</label>
                    <div className="flex gap-2 items-center">
                        <img src={formData.bridePhoto} className="w-10 h-10 object-cover rounded-full" />
                        <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'bridePhoto')} className="text-sm" />
                    </div>
                </div>
            </div>

            {/* Family */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded">
                <div>
                    <h3 className="font-bold mb-2 text-blue-600 uppercase">Nhà Trai</h3>
                    <div className="space-y-2">
                        <input placeholder="Ông" name="groomFather" value={formData.groomFather} onChange={handleChange} className="w-full border p-2 rounded" />
                        <input placeholder="Bà" name="groomMother" value={formData.groomMother} onChange={handleChange} className="w-full border p-2 rounded" />
                    </div>
                </div>
                <div>
                    <h3 className="font-bold mb-2 text-pink-600 uppercase">Nhà Gái</h3>
                    <div className="space-y-2">
                        <input placeholder="Ông" name="brideFather" value={formData.brideFather} onChange={handleChange} className="w-full border p-2 rounded" />
                        <input placeholder="Bà" name="brideMother" value={formData.brideMother} onChange={handleChange} className="w-full border p-2 rounded" />
                    </div>
                </div>
            </div>

            {/* Event Details */}
            <div className="space-y-2">
                <label className="block text-sm font-semibold">Lời Nhắn / Tiêu đề</label>
                <textarea name="invitationMessage" value={formData.invitationMessage} onChange={handleChange} className="w-full border p-2 rounded h-20" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="block text-sm font-semibold">Ngày Tổ Chức</label>
                    <input type="date" name="weddingDate" value={formData.weddingDate} onChange={handleChange} className="w-full border p-2 rounded" />
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-semibold">Giờ</label>
                    <input type="time" name="weddingTime" value={formData.weddingTime} onChange={handleChange} className="w-full border p-2 rounded" />
                </div>
            </div>

            {/* Schedule */}
            <div className="space-y-2 bg-gray-50 p-4 rounded">
                 <label className="block text-sm font-semibold mb-2">Lịch Trình</label>
                 {formData.weddingSchedule.map((item, idx) => (
                     <div key={idx} className="flex gap-2 items-center mb-2">
                         <input 
                            type="text" 
                            value={item.time} 
                            onChange={(e) => handleScheduleChange(idx, 'time', e.target.value)}
                            placeholder="Giờ (VD: 17:30)"
                            className="w-1/3 border p-2 rounded"
                         />
                         <input 
                            type="text" 
                            value={item.activity} 
                            onChange={(e) => handleScheduleChange(idx, 'activity', e.target.value)}
                            placeholder="Hoạt động (VD: Đón khách)"
                            className="w-2/3 border p-2 rounded"
                         />
                         <button onClick={() => removeScheduleItem(idx)} className="text-red-500 p-1 hover:bg-red-100 rounded">
                             <Trash2 size={16} />
                         </button>
                     </div>
                 ))}
                 <button onClick={addScheduleItem} className="text-sm text-blue-600 flex items-center gap-1 hover:underline mt-2">
                     <Plus size={16} /> Thêm mốc thời gian
                 </button>
            </div>

            {/* Location */}
            <div className="space-y-2">
                <label className="block text-sm font-semibold">Tên Địa Điểm</label>
                <input name="locationName" value={formData.locationName} onChange={handleChange} className="w-full border p-2 rounded" />
                <label className="block text-sm font-semibold">Địa Chỉ Chi Tiết</label>
                <input name="locationAddress" value={formData.locationAddress} onChange={handleChange} className="w-full border p-2 rounded" />
            </div>

            {/* Main Photo */}
            <div className="space-y-2">
                 <label className="block text-sm font-semibold">Ảnh Chính (Cặp đôi)</label>
                 <img src={formData.couplePhoto} className="w-full h-32 object-cover rounded" />
                 <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'couplePhoto')} className="w-full" />
            </div>

             {/* Gallery */}
             <div className="space-y-2">
                <label className="block text-sm font-semibold">Album Ảnh (Thêm nhiều ảnh)</label>
                <div className="flex flex-wrap gap-2 mb-2">
                    {formData.galleryImages.map((img, idx) => (
                        <div key={idx} className="relative group w-20 h-20">
                            <img src={img} className="w-full h-full object-cover rounded border" />
                            <button onClick={() => removeGalleryImage(idx)} className="absolute top-0 right-0 bg-red-500 text-white p-0.5 rounded-full opacity-0 group-hover:opacity-100">
                                <X size={12} />
                            </button>
                        </div>
                    ))}
                </div>
                <input type="file" accept="image/*" multiple onChange={handleGalleryUpload} className="w-full" />
            </div>

             {/* Music */}
             <div className="space-y-2">
                <label className="block text-sm font-semibold">Nhạc nền (URL MP3)</label>
                <input name="musicUrl" value={formData.musicUrl} onChange={handleChange} className="w-full border p-2 rounded" />
                <p className="text-xs text-gray-500">Lưu ý: Sử dụng link trực tiếp file .mp3</p>
            </div>

        </div>

        <div className="p-4 border-t bg-gray-100 flex justify-end gap-3 rounded-b-lg">
            <button onClick={handleExport} className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-200 flex items-center gap-2">
                <Upload size={16}/> Export JSON
            </button>
          <button onClick={() => onSave(formData)} className="px-6 py-2 bg-wedding-red text-white rounded hover:bg-red-900 flex items-center gap-2">
            <Save size={16} /> Lưu Thay Đổi
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
