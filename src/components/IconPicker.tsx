import { useState, useEffect, useRef } from 'react';
import { iconMap, iconCategories, iconCategoryMap } from '../utils/icons';

interface IconPickerProps {
  value: string;
  onChange: (icon: string) => void;
}

const IconPicker = ({ value, onChange }: IconPickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const pickerRef = useRef<HTMLDivElement>(null);
  
  // Close picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Filter icons based on search term and selected category
  const filteredIcons = Object.keys(iconMap).filter(icon => {
    const matchesSearch = !searchTerm || icon.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || iconCategoryMap[icon] === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  
  // Select icon and close picker
  const handleSelectIcon = (icon: string) => {
    onChange(icon);
    setIsOpen(false);
  };
  
  // Render current selected icon
  const SelectedIcon = value && iconMap[value] ? iconMap[value] : null;
  
  return (
    <div className="relative" ref={pickerRef}>
      <div 
        className="flex items-center justify-between px-4 py-2 border border-gray-300 rounded-md cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          {SelectedIcon ? (
            <>
              <SelectedIcon className="w-5 h-5 mr-2 text-gray-600" />
              <span>{value}</span>
            </>
          ) : (
            <span className="text-gray-500">Select an icon</span>
          )}
        </div>
        <svg 
          className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      
      {isOpen && (
        <div className="absolute z-10 w-80 mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
          <div className="p-2 border-b">
            <input
              type="text"
              placeholder="Search icons..."
              className="w-full px-2 py-1 border border-gray-300 rounded mb-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            
            <div className="flex flex-wrap gap-1">
              <button
                onClick={() => setSelectedCategory('')}
                className={`px-2 py-1 text-xs rounded-full ${
                  selectedCategory === '' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                }`}
              >
                All
              </button>
              
              {iconCategories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-2 py-1 text-xs rounded-full ${
                    selectedCategory === category.id ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
          
          <div className="p-2 max-h-60 overflow-y-auto grid grid-cols-6 gap-2">
            {filteredIcons.length > 0 ? (
              filteredIcons.map(icon => {
                const IconComponent = iconMap[icon];
                return (
                  <div
                    key={icon}
                    className={`p-2 rounded cursor-pointer flex flex-col items-center justify-center text-center hover:bg-blue-50 ${
                      value === icon ? 'bg-blue-100 ring-2 ring-blue-300' : ''
                    }`}
                    onClick={() => handleSelectIcon(icon)}
                    title={icon}
                  >
                    <IconComponent className="w-5 h-5 mb-1" />
                    <span className="text-xs truncate w-full">{icon}</span>
                  </div>
                );
              })
            ) : (
              <div className="col-span-6 py-4 text-center text-gray-500">
                No icons found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default IconPicker; 