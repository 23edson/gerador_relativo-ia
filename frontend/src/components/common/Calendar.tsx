import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';

interface CalendarProps {
  value?: Date;
  onChange?: (date: Date) => void;
  placeholder?: string;
  label?: string;
  supportingText?: string;
}

const Calendar: React.FC<CalendarProps> = ({
  value,
  onChange,
  placeholder = "MM/DD/YYYY",
  label = "Date",
  supportingText = "MM/DD/YYYY"
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(value || new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(value || null);
  const calendarRef = useRef<HTMLDivElement>(null);

  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  // Fechar calendário quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Fechar com Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days: Date[] = [];
    const endDate = new Date(lastDay);
    endDate.setDate(endDate.getDate() + (6 - lastDay.getDay()));
    
    const current = new Date(startDate);
    while (current <= endDate) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    
    return days;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + (direction === 'next' ? 1 : -1));
    setCurrentMonth(newMonth);
  };

  const navigateYear = (direction: 'prev' | 'next') => {
    const newMonth = new Date(currentMonth);
    newMonth.setFullYear(newMonth.getFullYear() + (direction === 'next' ? 1 : -1));
    setCurrentMonth(newMonth);
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setCurrentMonth(date);
  };

  const handleOk = () => {
    if (selectedDate && onChange) {
      onChange(selectedDate);
    }
    setIsOpen(false);
  };

  const handleCancel = () => {
    setSelectedDate(value || null);
    setIsOpen(false);
  };

  const isDateInCurrentMonth = (date: Date) => {
    return date.getMonth() === currentMonth.getMonth();
  };

  const isDateSelected = (date: Date) => {
    if (!selectedDate) return false;
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const days = getDaysInMonth(currentMonth);

  return (
    <div className="relative w-full" ref={calendarRef}>
      {/* Input Field */}
      <div className="relative">
        <div
          className={`
            flex items-center w-full px-4 py-3 border-2 rounded-md cursor-pointer
            transition-colors duration-200
            ${isOpen 
              ? 'border-purple-600 bg-purple-50' 
              : 'border-gray-300 hover:border-gray-400 bg-white'
            }
          `}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex-1">
            {label && (
              <label className={`
                absolute -top-2 left-3 px-1 text-xs font-medium bg-white
                transition-colors duration-200
                ${isOpen ? 'text-purple-600' : 'text-gray-600'}
              `}>
                {label}
              </label>
            )}
            <input
              type="text"
              value={formatDate(selectedDate)}
              placeholder={placeholder}
              readOnly
              className="w-full bg-transparent outline-none text-gray-900 placeholder-gray-500"
            />
          </div>
          <CalendarIcon className="w-5 h-5 text-gray-600 ml-2" />
        </div>
        
        {supportingText && (
          <p className="mt-1 text-xs text-gray-600 px-4">{supportingText}</p>
        )}
      </div>

      {/* Calendar Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 z-50 mt-2 bg-white rounded-2xl shadow-xl border border-gray-200 p-3">
          <div className="w-96">
            {/* Month/Year Navigation */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <button
                  onClick={() => navigateMonth('prev')}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Mês anterior"
                >
                  <ChevronLeft className="w-4 h-4 text-gray-600" />
                </button>
                <div className="flex items-center px-2 py-1 rounded-full hover:bg-gray-100 cursor-pointer">
                  <span className="text-sm font-medium text-gray-700">
                    {months[currentMonth.getMonth()]}
                  </span>
                  <ChevronRight className="w-3 h-3 text-gray-600 ml-1 rotate-90" />
                </div>
                <button
                  onClick={() => navigateMonth('next')}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Próximo mês"
                >
                  <ChevronRight className="w-4 h-4 text-gray-600" />
                </button>
              </div>
              
              <div className="flex items-center">
                <button
                  onClick={() => navigateYear('prev')}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Ano anterior"
                >
                  <ChevronLeft className="w-4 h-4 text-gray-600" />
                </button>
                <div className="flex items-center px-2 py-1 rounded-full hover:bg-gray-100 cursor-pointer">
                  <span className="text-sm font-medium text-gray-700">
                    {currentMonth.getFullYear()}
                  </span>
                  <ChevronRight className="w-3 h-3 text-gray-600 ml-1 rotate-90" />
                </div>
                <button
                  onClick={() => navigateYear('next')}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Próximo ano"
                >
                  <ChevronRight className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Days of Week Header */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {daysOfWeek.map((day) => (
                <div
                  key={day}
                  className="h-12 flex items-center justify-center text-sm font-medium text-gray-500"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 mb-4">
              {days.map((date, index) => {
                const isCurrentMonth = isDateInCurrentMonth(date);
                const isSelected = isDateSelected(date);
                const isTodayDate = isToday(date);
                
                return (
                  <button
                    key={index}
                    onClick={() => handleDateSelect(date)}
                    className={`
                      h-10 w-10 rounded-full flex items-center justify-center text-sm
                      transition-all duration-200 hover:bg-gray-100 relative
                      ${isSelected
                        ? 'bg-purple-600 text-white hover:bg-purple-700'
                        : isCurrentMonth
                        ? 'text-gray-900 hover:bg-gray-100'
                        : 'text-gray-400 hover:bg-gray-50'
                      }
                      ${isTodayDate && !isSelected
                        ? 'ring-2 ring-purple-600 ring-opacity-50'
                        : ''
                      }
                    `}
                    aria-label={`Selecionar ${date.toLocaleDateString('pt-BR')}`}
                  >
                    {date.getDate()}
                    {isTodayDate && !isSelected && (
                      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-purple-600 rounded-full"></div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-2 pt-2 border-t border-gray-100">
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-sm font-medium text-purple-600 rounded-full hover:bg-purple-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleOk}
                className="px-4 py-2 text-sm font-medium text-purple-600 rounded-full hover:bg-purple-50 transition-colors"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
