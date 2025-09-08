// 3D 아이콘 컴포넌트
export const Icon3D = {
  // 기본 3D 아이콘들
  Box: () => (
    <div className="relative inline-block">
      <div className="w-8 h-8 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-700 rounded-lg transform rotate-3 shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-t from-blue-600/30 to-transparent rounded-lg"></div>
        <div className="absolute top-1 right-1 w-2 h-2 bg-white/20 rounded-sm"></div>
        <div className="flex items-center justify-center h-full text-white font-bold text-lg">
          📦
        </div>
      </div>
    </div>
  ),

  Search: () => (
    <div className="relative inline-block">
      <div className="w-6 h-6 bg-gradient-to-br from-gray-300 via-gray-400 to-gray-600 rounded-full transform -rotate-12 shadow-md">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-500/20 to-white/40 rounded-full"></div>
        <div className="flex items-center justify-center h-full text-gray-700 text-sm">🔍</div>
      </div>
    </div>
  ),

  Bell: () => (
    <div className="relative inline-block transform hover:animate-bounce">
      <div className="w-6 h-6 bg-gradient-to-br from-yellow-300 via-yellow-400 to-orange-500 rounded-lg transform rotate-6 shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-t from-orange-400/30 to-white/40 rounded-lg"></div>
        <div className="flex items-center justify-center h-full text-white text-sm">🔔</div>
      </div>
    </div>
  ),

  Settings: () => (
    <div className="relative inline-block transform hover:rotate-12 transition-transform duration-300">
      <div className="w-6 h-6 bg-gradient-to-br from-gray-400 via-gray-500 to-gray-700 rounded-lg shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-600/30 to-white/30 rounded-lg"></div>
        <div className="flex items-center justify-center h-full text-white text-sm">⚙️</div>
      </div>
    </div>
  ),

  User: () => (
    <div className="relative inline-block">
      <div className="w-8 h-8 bg-gradient-to-br from-indigo-300 via-indigo-400 to-indigo-600 rounded-full shadow-lg transform">
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/20 to-white/40 rounded-full"></div>
        <div className="flex items-center justify-center h-full text-white text-sm">👤</div>
      </div>
    </div>
  ),

  // 메뉴 아이콘들
  Products: () => (
    <div className="relative inline-block transform hover:scale-110 transition-transform duration-200">
      <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-700 rounded-xl transform rotate-6 shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-600/30 to-white/30 rounded-xl"></div>
        <div className="absolute top-1 right-1 w-2 h-2 bg-white/30 rounded-sm"></div>
        <div className="flex items-center justify-center h-full text-white font-bold">📦</div>
      </div>
    </div>
  ),

  Mall: () => (
    <div className="relative inline-block transform hover:scale-110 transition-transform duration-200">
      <div className="w-8 h-8 bg-gradient-to-br from-purple-400 via-purple-500 to-purple-700 rounded-xl transform -rotate-3 shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-t from-purple-600/30 to-white/30 rounded-xl"></div>
        <div className="absolute top-1 left-1 w-2 h-2 bg-white/30 rounded-full"></div>
        <div className="flex items-center justify-center h-full text-white font-bold">🛒</div>
      </div>
    </div>
  ),

  Basic: () => (
    <div className="relative inline-block transform hover:scale-110 transition-transform duration-200">
      <div className="w-8 h-8 bg-gradient-to-br from-orange-400 via-orange-500 to-red-600 rounded-xl transform rotate-2 shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-t from-red-500/30 to-white/30 rounded-xl"></div>
        <div className="absolute bottom-1 right-1 w-2 h-2 bg-white/40 rounded-sm"></div>
        <div className="flex items-center justify-center h-full text-white font-bold">⚙️</div>
      </div>
    </div>
  ),

  Components: () => (
    <div className="relative inline-block transform hover:scale-110 transition-transform duration-200">
      <div className="w-8 h-8 bg-gradient-to-br from-pink-400 via-pink-500 to-rose-600 rounded-xl transform -rotate-6 shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-t from-rose-500/30 to-white/30 rounded-xl"></div>
        <div className="absolute top-1 right-1 w-3 h-1 bg-white/40 rounded-full"></div>
        <div className="absolute bottom-1 left-1 w-1 h-3 bg-white/40 rounded-full"></div>
        <div className="flex items-center justify-center h-full text-white font-bold">🎨</div>
      </div>
    </div>
  ),

  Categories: () => (
    <div className="relative inline-block transform hover:scale-110 transition-transform duration-200">
      <div className="w-8 h-8 bg-gradient-to-br from-teal-400 via-teal-500 to-teal-700 rounded-xl transform rotate-1 shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-t from-teal-600/30 to-white/30 rounded-xl"></div>
        <div className="absolute top-1 left-1 w-2 h-2 bg-white/40 rounded-sm"></div>
        <div className="flex items-center justify-center h-full text-white font-bold">📁</div>
      </div>
    </div>
  ),

  Inventory: () => (
    <div className="relative inline-block transform hover:scale-110 transition-transform duration-200">
      <div className="w-8 h-8 bg-gradient-to-br from-amber-400 via-amber-500 to-orange-600 rounded-xl transform -rotate-2 shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-t from-orange-500/30 to-white/30 rounded-xl"></div>
        <div className="absolute bottom-1 left-1 w-2 h-2 bg-white/40 rounded-full"></div>
        <div className="flex items-center justify-center h-full text-white font-bold">📊</div>
      </div>
    </div>
  ),

  Alert: () => (
    <div className="relative inline-block transform hover:pulse">
      <div className="w-5 h-5 bg-gradient-to-br from-red-300 via-red-400 to-red-600 rounded-full shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-t from-red-500/20 to-white/50 rounded-full"></div>
        <div className="flex items-center justify-center h-full text-white text-xs">⚠️</div>
      </div>
    </div>
  ),

  Share: () => (
    <div className="relative inline-block transform hover:scale-110 transition-transform duration-200">
      <div className="w-6 h-6 bg-gradient-to-br from-indigo-300 via-indigo-400 to-indigo-600 rounded-lg shadow-md">
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/20 to-white/40 rounded-lg"></div>
        <div className="flex items-center justify-center h-full text-white text-xs">📤</div>
      </div>
    </div>
  ),

  // 액션 아이콘들
  Edit: () => (
    <div className="relative inline-block transform hover:rotate-12 transition-transform duration-200">
      <div className="w-6 h-6 bg-gradient-to-br from-blue-300 via-blue-400 to-blue-600 rounded-lg shadow-md">
        <div className="absolute inset-0 bg-gradient-to-t from-blue-500/20 to-white/40 rounded-lg"></div>
        <div className="flex items-center justify-center h-full text-white text-xs">✏️</div>
      </div>
    </div>
  ),

  Copy: () => (
    <div className="relative inline-block transform hover:scale-110 transition-transform duration-200">
      <div className="w-6 h-6 bg-gradient-to-br from-green-300 via-green-400 to-green-600 rounded-lg shadow-md">
        <div className="absolute inset-0 bg-gradient-to-t from-green-500/20 to-white/40 rounded-lg"></div>
        <div className="flex items-center justify-center h-full text-white text-xs">📋</div>
      </div>
    </div>
  ),

  Delete: () => (
    <div className="relative inline-block transform hover:scale-110 hover:rotate-6 transition-all duration-200">
      <div className="w-6 h-6 bg-gradient-to-br from-red-300 via-red-400 to-red-600 rounded-lg shadow-md">
        <div className="absolute inset-0 bg-gradient-to-t from-red-500/20 to-white/40 rounded-lg"></div>
        <div className="flex items-center justify-center h-full text-white text-xs">🗑️</div>
      </div>
    </div>
  ),

  Plus: () => (
    <div className="relative inline-block transform hover:rotate-90 transition-transform duration-300">
      <div className="w-6 h-6 bg-gradient-to-br from-emerald-300 via-emerald-400 to-emerald-600 rounded-full shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/20 to-white/40 rounded-full"></div>
        <div className="flex items-center justify-center h-full text-white font-bold text-sm">+</div>
      </div>
    </div>
  ),

  // 상태 아이콘들
  Success: () => (
    <div className="relative inline-block transform hover:bounce">
      <div className="w-6 h-6 bg-gradient-to-br from-green-300 via-green-400 to-green-600 rounded-full shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-t from-green-500/20 to-white/50 rounded-full"></div>
        <div className="flex items-center justify-center h-full text-white text-sm">✅</div>
      </div>
    </div>
  ),

  Error: () => (
    <div className="relative inline-block transform hover:shake">
      <div className="w-6 h-6 bg-gradient-to-br from-red-300 via-red-400 to-red-600 rounded-full shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-t from-red-500/20 to-white/50 rounded-full"></div>
        <div className="flex items-center justify-center h-full text-white text-sm">❌</div>
      </div>
    </div>
  ),

  Warning: () => (
    <div className="relative inline-block transform hover:pulse">
      <div className="w-6 h-6 bg-gradient-to-br from-yellow-300 via-yellow-400 to-orange-500 rounded-full shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-t from-orange-400/20 to-white/50 rounded-full"></div>
        <div className="flex items-center justify-center h-full text-white text-sm">⚠️</div>
      </div>
    </div>
  ),

  Info: () => (
    <div className="relative inline-block transform hover:pulse">
      <div className="w-6 h-6 bg-gradient-to-br from-blue-300 via-blue-400 to-blue-600 rounded-full shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-t from-blue-500/20 to-white/50 rounded-full"></div>
        <div className="flex items-center justify-center h-full text-white text-sm">ℹ️</div>
      </div>
    </div>
  ),
};
